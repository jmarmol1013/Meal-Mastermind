/* eslint-disable no-undef */
import { cookies } from 'next/headers';

export const serverSideFetchPost = async (
    url: string,
    method: string,
    bodyData: any,
    cache: RequestCache,
) => {
    try {
        const session = cookies().get('__session')?.value;
        if (!session) throw 'No session';

        return await fetch(url, {
            method: method,
            headers: {
                session: session,
            },
            body: JSON.stringify(bodyData),
            cache: cache,
        });
    } catch (error) {
        return null;
    }
};

export const serverSideFetchGet = async (url: string, cache: RequestCache) => {
    try {
        const session = cookies().get('__session')?.value;
        if (!session) throw 'No session';

        return await fetch(url, {
            headers: {
                session: session,
            },
            cache: cache,
        });
    } catch (error) {
        return null;
    }
};
