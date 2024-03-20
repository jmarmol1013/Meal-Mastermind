import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { APIResponse } from '@typesApp/api';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { Users } from '@models/users';

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
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

        const email = params.email;
        await connectMongo();
        const userUsername = await Users.findOne({ email: email }, { _id: 0, username: 1 });

        if (!userUsername) {
            return NextResponse.json<APIResponse<void>>({
                statusCode: 404,
                message: 'User found.',
            });
        }

        const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

        cookies().set('username', userUsername, {
            maxAge: expiresIn,
            httpOnly: true,
            secure: true,
        });

        return NextResponse.json<APIResponse<void>>({
            statusCode: 200,
            message: 'Username return sucessfully.',
        });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
