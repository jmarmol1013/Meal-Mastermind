import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';

export const updateUserRecipes = async (username: string, recipesId: string[]) => {
    try {
        const response = await fetch(`${process.env.API_PROFILE}/${username}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipesId),
        });

        const resBody = (await response.json()) as unknown as APIResponse<User>;

        if (response.ok && resBody.statusCode === 200 && resBody.data) {
            return resBody.data;
        }

        return null;
    } catch (error) {
        console.error('Error getting profile information', error);
        return null;
    }
};
