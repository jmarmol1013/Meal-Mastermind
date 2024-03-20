import { Recipes } from '@models/recipes';
import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
import { Recipe } from '@typesApp/recipes';
import { User } from '@typesApp/user';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    try {
        const isAuth = await isUserAuthenticated();

        if (!isAuth) {
            return NextResponse.json<APIResponse<void>>(
                {
                    statusCode: 401,
                    message: 'Must be authenticated.',
                },
                {
                    status: 401,
                },
            );
        }

        await connectMongo();
        const username = params.username;

        if (username) {
            const user: User | null = await Users.findOne({ username: username });

            if (!user) {
                return NextResponse.json<APIResponse<void>>(
                    {
                        statusCode: 404,
                        message: 'User not found.',
                    },
                    {
                        status: 404,
                    },
                );
            }

            const recipesId = user.recipes;
            const recipes: Recipe[] = await Promise.all(recipesId!.map(id => Recipes.findById(id)));

            if (!recipes || recipes.length == 0) {
                return NextResponse.json<APIResponse<void>>(
                    {
                        statusCode: 404,
                        message: 'No recipes found.',
                    },
                    {
                        status: 404,
                    },
                );
            }

            return NextResponse.json<APIResponse<Recipe[]>>({
                statusCode: 200,
                message: 'User favorites recipes find sucessfully.',
                data: recipes,
            });
        }

        return NextResponse.json<APIResponse<void>>(
            {
                statusCode: 400,
                message: 'There is not username provide',
            },
            {
                status: 400,
            },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
