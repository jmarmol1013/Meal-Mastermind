import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { ObjectId } from 'mongoose';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { username: string } }) {
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

        const body = (await req.json()) as { recipesToUpdate: string[] };
        const recipesToUpdate = body.recipesToUpdate;

        await connectMongo();
        const username = params.username;

        if (!username) {
            return NextResponse.json<APIResponse<void>>(
                {
                    statusCode: 400,
                    message: 'The request body is missing required fields.',
                },
                {
                    status: 400,
                },
            );
        }

        // Call AI API to get recipes
        // const recipes: Recipe["_id"][] = getNewRecipes(username, recipesToUpdate);

        // if (!recipes) {
        //     return NextResponse.json<APIResponse<void>>(
        //         {
        //             statusCode: 404,
        //             message: 'Error getting recipes from the model.',
        //         },
        //         {
        //             status: 404,
        //         },
        //     );
        // }

        const user: User | null = await Users.findOne({ username: username });

        if (!user) {
            return NextResponse.json<APIResponse<void>>(
                {
                    statusCode: 404,
                    message: 'Error getting recipes from the user.',
                },
                {
                    status: 404,
                },
            );
        }

        const newRecipes = user.recipes?.slice(recipesToUpdate.length);
        recipesToUpdate.forEach((recipe) => newRecipes?.push(recipe as unknown as ObjectId));

        const updateUser = await Users.findOneAndUpdate(
            { username: username },
            { $set: { recipes: newRecipes } },
            { new: true },
        );

        return NextResponse.json<APIResponse<User>>({
            statusCode: 200,
            message: 'User recipes update sucessfully.',
            data: updateUser,
        });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
