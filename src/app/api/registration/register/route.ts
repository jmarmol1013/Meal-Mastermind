import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { cookies } from 'next/headers';
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
        const user: User = body.user;

        if (user.email || user.firstName || user.lastName || user.username) {
            user.isRegister = false;
            user.role = 'user';
            const userDB = await Users.create(user);

            const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
            cookies().set('username', user.username, {
                maxAge: expiresIn,
                httpOnly: true,
                secure: true,
            });

            return NextResponse.json<APIResponse<User>>({
                statusCode: 200,
                message: 'User save sucessfully.',
                data: userDB,
            });
        }

        return NextResponse.json<APIResponse<User>>(
            {
                statusCode: 400,
                message: 'The request user is missing required fields.',
            },
            {
                status: 400,
            },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
