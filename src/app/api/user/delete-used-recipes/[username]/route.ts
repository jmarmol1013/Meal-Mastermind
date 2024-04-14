import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { username: string } }) {
    try {
        const session = req.headers.get('session');
        const isAuth = await isUserAuthenticated(session!);

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
        const request = await req.json();
        const numberRecipesToDelete: number = await request.numberRecipesToDelete;

        if (!numberRecipesToDelete) {
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

        const user: User | null = await Users.findOne({ username: username });
        const recipes = user?.recipes;
        const updatedRecipes =
            recipes!.length > numberRecipesToDelete ? recipes!.slice(numberRecipesToDelete) : [];

        const updateUser = await Users.findOneAndUpdate(
            { username: username },
            { $set: { recipes: updatedRecipes, lastUpdateRecipesDate: new Date() } },
            { new: true },
        );

        return NextResponse.json<APIResponse<User>>({
            statusCode: 200,
            message: 'User recipes deleted sucessfully.',
            data: updateUser,
        });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
