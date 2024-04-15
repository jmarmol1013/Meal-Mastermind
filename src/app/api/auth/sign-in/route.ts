import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { APIResponse } from '@typesApp/api';
import { createSessionCookie } from '@utils/firebase/firebase-admin';

export async function POST(request: NextRequest) {
    const reqBody = (await request.json()) as { idToken: string };
    const idToken = reqBody.idToken;

    if (!idToken) {
        return NextResponse.json<APIResponse<string>>({
            statusCode: 400,
            message: 'No ID token provided',
        });
    }

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

    const sessionCookie = await createSessionCookie(idToken, { expiresIn });
    cookies().set('__session', sessionCookie, {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
    });

    return NextResponse.json<APIResponse<string>>({
        statusCode: 200,
        message: 'Sign in sucessfully',
    });
}
