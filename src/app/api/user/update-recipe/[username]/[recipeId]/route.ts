import { Users } from '@models/users';
import { AddOneRecipeToUser } from '@typesApp/addRecipeToUser';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(
    req: NextRequest,
    { params }: { params: { username: string; recipeId: string } },
) {
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
        const recipeId = params.recipeId;

        const updateFields: AddOneRecipeToUser = await req.json();

        if (recipeId && recipeId != '' && username && username != '' && updateFields.recipe) {
            const removeRecipe = await Users.findOneAndUpdate(
                { username: username },
                { $pull: { recipes: recipeId } },
                { new: true },
            );

            if (!removeRecipe) {
                return NextResponse.json<APIResponse<void>>(
                    {
                        statusCode: 404,
                        message: 'Recipe not found.',
                    },
                    {
                        status: 404,
                    },
                );
            }

            const updateUser = await Users.findOneAndUpdate(
                { username: username },
                { $addToSet: { recipes: updateFields.recipe } },
                { new: true },
            );

            return NextResponse.json<APIResponse<User>>({
                statusCode: 200,
                message: 'User recipe update sucessfully.',
                data: updateUser as User,
            });
        }

        return NextResponse.json<APIResponse<void>>(
            {
                statusCode: 400,
                message: 'The request body is missing required fields.',
            },
            {
                status: 400,
            },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
