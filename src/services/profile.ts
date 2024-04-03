import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { serverSideFetchGet } from './serverSide';
//import { numberRecipesToUpdate, validateUpdateDate } from '@utils/validateDate';

export const getProfile = async (email: string) => {
    try {
        const response = await fetch(`${process.env.API_PROFILE}/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resBody = (await response.json()) as unknown as APIResponse<User>;

        // To update recipes for each day
        // const dayOfLastUpdate = validateUpdateDate(resBody.data?.lastUpdateRecipesDate!);
        // if(dayOfLastUpdate > 1){
        //     const response = await fetch(`${process.env.API_UPDATE_RECIPES}/${resBody.data?.username}`,{
        //         method:'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({recipesToUpdate: numberRecipesToUpdate(dayOfLastUpdate)}),
        //     })

        //     if (response.ok && resBody.statusCode === 200 && resBody.data) {
        //         return resBody.data;
        //     }
        // }

        if (response.ok && resBody.statusCode === 200 && resBody.data) {
            return resBody.data;
        }

        return null;
    } catch (error) {
        console.error('Error signing in with email and password', error);
        return null;
    }
};

export const updateRecipes = async (username: string) => {
    try {
        const response = await serverSideFetchGet(
            `${process.env.NEXT_PUBLIC_API_UPDATE_RECIPES!}/${username}`,
            'no-cache',
        );
        if (!response) throw 'Error';

        const resBody = (await response.json()) as unknown as APIResponse<User>;

        if (response.ok && resBody.statusCode === 200 && resBody.data) {
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
};
