import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { UserPreferences } from '@typesApp/user-preferences';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
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

        if (username) {
            const user: User | null = await Users.findOne({ username: username });

            if (!user || !user.type || !user.cuisines || !user.favorites) {
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

            const preferences: UserPreferences = {
                type: user.type,
                cuisines: user.cuisines,
                allergies: user.allergies,
                favorites: user.favorites,
            };

            return NextResponse.json<APIResponse<UserPreferences>>({
                statusCode: 200,
                message: 'User preferences find sucessfully.',
                data: preferences,
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
