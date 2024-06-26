import { APIResponse } from '@typesApp/api';
import { Recipe } from '@typesApp/recipes';
import { Cuisine, User } from '@typesApp/user';
import { serverSideFetchGet } from './serverSide';
import { UserPreferences } from '@typesApp/user-preferences';

export const getRandomRecipes = async (cuisines: Cuisine[], userType: User['type']) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_GET_RANDOM_RECIPES}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ cuisines, userType }),
        });

        const resBody = (await response.json()) as unknown as APIResponse<Recipe[]>;

        if (response.ok && resBody.statusCode === 200 && resBody.data) {
            return resBody.data;
        }

        return null;
    } catch (error) {
        console.error('Error getting profile information', error);
        return null;
    }
};

export const updatePreferences = async (
    username: string,
    type: User['type'],
    cuisines: User['cuisines'],
    favorites: Recipe['_id'][],
    allergies: User['allergies'],
) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_UPDATE_USER_PREFERENCES!}/${username}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type, cuisines, favorites, allergies }),
            },
        );

        const resBody = (await response.json()) as unknown as APIResponse<void>;

        if (response.ok && resBody.statusCode === 200 && resBody.data) {
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
};

export const getUserPreferences = async (username: string, session: string) => {
    try {
        const response = await serverSideFetchGet(
            session,
            `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_GET_PREFERENCES}/${username}`,
            'no-cache',
        );
        if (!response) throw 'Error getting user preferences';

        const resBody = (await response.json()) as unknown as APIResponse<UserPreferences>;
        const preferences = resBody.data;

        return preferences;
    } catch (error) {
        return null;
    }
};
