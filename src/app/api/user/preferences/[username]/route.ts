import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { UserPreferences } from '@typesApp/user-preferences';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
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

        await connectMongo();
        const username = params.username;
        const updateFields: UserPreferences = await req.json();

        if (updateFields.type || updateFields.cuisines || updateFields.favorites) {
            const updatedUser = await Users.findOneAndUpdate(
                { username: username },
                { $set: { ...updateFields, isRegister: true } },
                { new: true },
            );

            if (!updatedUser) {
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

            return NextResponse.json<APIResponse<User>>({
                statusCode: 200,
                message: 'User update sucessfully.',
                data: updatedUser as User,
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
