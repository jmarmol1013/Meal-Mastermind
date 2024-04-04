/* eslint-disable no-undef */
export const serverSideFetchPost = async (
    session: string,
    url: string,
    method: string,
    bodyData: any,
    cache: RequestCache,
) => {
    try {
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

export const serverSideFetchGet = async (session: string, url: string, cache: RequestCache) => {
    try {
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
