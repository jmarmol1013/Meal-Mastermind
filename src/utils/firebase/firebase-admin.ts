import 'server-only';

import { cookies } from 'next/headers';
import { initializeApp, getApps, cert, ServiceAccount } from 'firebase-admin/app';
import { SessionCookieOptions, getAuth } from 'firebase-admin/auth';

const FIREBASE_CREDENTIALS: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

export const firebaseApp =
    getApps().find((it) => it.name === 'firebase-admin-app') ||
    initializeApp(
        {
            credential: cert(FIREBASE_CREDENTIALS),
        },
        'firebase-admin-app',
    );

export const auth = getAuth(firebaseApp);

export const isUserAuthenticated = async (session: string | undefined = undefined) => {
    const _session = session ?? (await getSession());
    if (!_session) return false;

    try {
        const isRevoked = !(await auth.verifySessionCookie(_session, true));
        return !isRevoked;
    } catch (error) {
        return false;
    }
};

export const getCurrentUser = async () => {
    const session = await getSession();

    if (!(await isUserAuthenticated(session))) {
        return null;
    }

    const decodedIdToken = await auth.verifySessionCookie(session!);
    const currentUser = await auth.getUser(decodedIdToken.uid);

    return currentUser;
};

const getSession = async () => {
    try {
        return cookies().get('__session')?.value;
    } catch (error) {
        return undefined;
    }
};

export const createSessionCookie = async (
    idToken: string,
    sessionCookieOptions: SessionCookieOptions,
) => {
    return auth.createSessionCookie(idToken, sessionCookieOptions);
};

export const revokeAllSessions = async (session: string) => {
    const decodedIdToken = await auth.verifySessionCookie(session);

    return await auth.revokeRefreshTokens(decodedIdToken.sub);
};
