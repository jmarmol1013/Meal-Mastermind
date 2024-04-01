import { APIResponse } from '@typesApp/api';
import { Recipe } from '@typesApp/recipes';
import { Cuisine, User } from '@typesApp/user';

export const getRandomRecipes = async (cuisines: Cuisine[], userType: User['type']) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_GET_RANDOM_RECIPES}`, {
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
