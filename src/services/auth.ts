import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { APIResponse } from '@typesApp/api';
import { auth } from '@utils/firebase/firebase';

export const signIn = async (email: string, password: string) => {
    try {
        const userCreds = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCreds.user.getIdToken();

        const response = await fetch(process.env.NEXT_PUBLIC_API_SIGNIN!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        const resBody = (await response.json()) as unknown as APIResponse<string>;
        if (response.ok && resBody.statusCode === 200) {
            return true;
        } else return false;
    } catch (error) {
        console.error('Error signing in with email and password', error);
        return false;
    }
};

export const signUp = async (email: string, password: string) => {
    try {
        const userCreds = await createUserWithEmailAndPassword(auth, email, password);
        const idToken = await userCreds.user.getIdToken();
        const response = await fetch(process.env.NEXT_PUBLIC_API_SIGNUP!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken }),
        });

        const resBody = (await response.json()) as unknown as APIResponse<string>;

        if (response.ok && resBody.statusCode == 200) {
            return true;
        } else return false;
    } catch (error) {
        console.error('Error signing up with email and password', error);
        return false;
    }
};

export const signOut = async () => {
    try {
        await auth.signOut();

        const response = await fetch('/api/auth/sign-out', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const resBody = (await response.json()) as unknown as APIResponse<string>;
        if (response.ok && resBody.statusCode == 200) {
            return true;
        } else return false;
    } catch (error) {
        console.error('Error signing out with email and password', error);
        return false;
    }
};
