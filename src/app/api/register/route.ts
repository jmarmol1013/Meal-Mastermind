import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
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
        const body: User = await req.json();

        if (body.email || body.firstName || body.lastName || body.username) {
            body.isRegister = false;
            const user = await Users.create(body);

            return NextResponse.json<APIResponse<User>>({
                statusCode: 200,
                message: 'User save sucessfully.',
                data: user,
            });
        }

        return NextResponse.json<APIResponse<User>>(
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
