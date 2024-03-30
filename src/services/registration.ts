import { RegistrationFormDto } from '@/app/(auth)/registration/RegistrationForm';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';

export const registration = async (user: RegistrationFormDto) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_REGISTRATION!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user }),
        });

        const resBody = (await response.json()) as unknown as APIResponse<User>;

        if (response.ok && resBody.statusCode == 200) {
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
};

export const validateUser = async (email: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_VALIDATE_USER!}/${email}`);
        const resBody = (await response.json()) as unknown as APIResponse<User>;

        if (response.ok && resBody.statusCode == 200) {
            return true;
        } else return false;
    } catch (error) {
        return false;
    }
};

export const validateUserPreferences = async (username: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_VALIDATE_USER_PREFERENCES!}/${username}`,
        );
        const resBody = (await response.json()) as unknown as APIResponse<Boolean>;

        if (response.ok && resBody.statusCode == 200) {
            return resBody.data;
        } else return false;
    } catch (error) {
        return false;
    }
};
