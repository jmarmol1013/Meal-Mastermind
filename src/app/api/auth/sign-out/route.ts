import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { APIResponse } from '@typesApp/api';
import { revokeAllSessions } from '@utils/firebase/firebase-admin';

export async function GET() {
    const sessionCookie = cookies().get('__session')?.value;

    if (!sessionCookie)
        return NextResponse.json<APIResponse<string>>(
            { statusCode: 400, message: 'Session not found' },
            { status: 400 },
        );

    cookies().delete('__session');
    cookies().delete('username');

    await revokeAllSessions(sessionCookie);

    return NextResponse.json<APIResponse<string>>({
        statusCode: 200,
        message: 'Sign out successfully',
    });
}
