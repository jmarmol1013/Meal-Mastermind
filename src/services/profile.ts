import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
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
