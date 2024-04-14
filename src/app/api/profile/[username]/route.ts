import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '@typesApp/api';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { Users } from '@models/users';
import { User } from '@typesApp/user';

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

        const username = params.username;
        await connectMongo();
        const user: User | null = await Users.findOne({ username: username });
        if (!user) {
            return NextResponse.json<APIResponse<void>>({
                statusCode: 404,
                message: 'User found.',
            });
        }

        return NextResponse.json<APIResponse<User>>({
            statusCode: 200,
            message: 'User return sucessfully.',
            data: user,
        });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
