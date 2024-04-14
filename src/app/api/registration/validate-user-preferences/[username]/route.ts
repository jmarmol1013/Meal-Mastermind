import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    try {
        const session = req.headers.get('session');
        const isAuth = await isUserAuthenticated(session!);

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
        const user = await Users.findOne({ username: params.username });

        if (user) {
            const body: User = user;

            return NextResponse.json<APIResponse<Boolean>>({
                statusCode: 200,
                message: 'User found.',
                data: body.isRegister,
            });
        }

        return NextResponse.json<APIResponse<User>>(
            {
                statusCode: 404,
                message: `User with ${params.username} not found.`,
            },
            {
                status: 404,
            },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
