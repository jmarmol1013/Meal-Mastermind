import { Recipes } from '@models/recipes';
import { APIResponse } from '@typesApp/api';
import { Recipe } from '@typesApp/recipes';
import { User } from '@typesApp/user';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    try {
        const isAuth = await isUserAuthenticated();

        if (!isAuth) {
            return NextResponse.json<APIResponse<User>>(
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
        const body = await req.json();
        const userType: User['type'] = body.userType;
        const cuisines: Recipe['cuisine'][] = body.cuisines;

        if (cuisines.length > 0) {
            const recipes: Recipe[] = await Recipes.aggregate([
                { $match: { cuisine: { $in: cuisines }, type: userType } },
                { $sample: { size: 10 } },
            ]);

            return NextResponse.json<APIResponse<Recipe[]>>({
                statusCode: 200,
                message: 'Recipes sent successfully',
                data: recipes,
            });
        }

        return NextResponse.json<APIResponse<User>>(
            {
                statusCode: 400,
                message: 'The request is missing required fields.',
            },
            {
                status: 400,
            },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
