import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { serverSideFetchGet, serverSideFetchPost } from './serverSide';
import { validateUpdateDate } from '@utils/validateDate';

export const getProfile = async (username: string, session: string) => {
    try {
        let user: User | null | undefined = null;

        const response = await serverSideFetchGet(
            session,
            `${process.env.NEXT_PUBLIC_API_GET_PROFILE}/${username}`,
            'no-cache',
        );
        if (!response) throw 'Error getting profile';

        const resBody = (await response.json()) as unknown as APIResponse<User>;
        user = resBody.data;

        // To delete used recipes
        const dayOfLastUpdate = validateUpdateDate(resBody.data?.lastUpdateRecipesDate!);
        if (dayOfLastUpdate >= 1) {
            user = await deleteUsedRecipes(username, session, dayOfLastUpdate);
        }

        // Update recipes if there is not
        if (user?.recipes?.length == 0) {
            user = await updateRecipes(username, session);
        }

        if (!user) throw 'Error getting profile information';

        return user;
    } catch (error) {
        return null;
    }
};

export const updateRecipes = async (username: string, session: string) => {
    try {
        const response = await serverSideFetchGet(
            session,
            `${process.env.NEXT_PUBLIC_API_UPDATE_RECIPES!}/${username}`,
            'no-cache',
        );
        if (!response) throw 'Error';

        const resBody = (await response.json()) as unknown as APIResponse<User>;
        if (response.ok && resBody.statusCode === 200 && resBody.data) {
            return resBody.data;
        }

        return null;
    } catch (error) {
        return null;
    }
};

export const deleteUsedRecipes = async (
    username: string,
    session: string,
    dayOfLastUpdate: Number,
) => {
    try {
        const data = { numberRecipesToDelete: dayOfLastUpdate };

        const response = await serverSideFetchPost(
            session,
            `${process.env.NEXT_PUBLIC_API_DELETE_USED_RECIPES}/${username}`,
            'PUT',
            data,
            'no-cache',
        );
        if (!response) throw 'error deleting recipes';

        const resBody = (await response.json()) as unknown as APIResponse<User>;
        if (response.ok && resBody.statusCode === 200 && resBody.data) {
            return resBody.data;
        }

        return null;
    } catch (error) {
        return null;
    }
};
