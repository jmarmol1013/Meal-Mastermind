'use client';

import { signIn } from '@services/auth';
import { redirect } from 'next/navigation';
import { useState } from 'react';

type LoginFormDto = {
    email: string;
    password: string;
};

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();

    const sendForm = async (formData: FormData) => {
        setIsLoading(true);

        const loginFormDto: LoginFormDto = {
            email: formData.get('email')!.toString(),
            password: formData.get('password')!.toString(),
        };

        try {
            const signedIn = await signIn(loginFormDto.email, loginFormDto.password);

            if (!signedIn) {
                throw new Error('Error');
            }
        } catch (e) {
            setError(`Error signing in please try again`);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        redirect('/dashboard');
    };

    return (
        <div className=" m-auto  flex h-screen flex-row items-center justify-center bg-sky-600">
            <div className="rounded-md bg-white p-8 shadow-md">
                <h2 className="text-secondary text-4xl">Welcome back to MealMastermind</h2>
                <h3 className="text-fifth pt-2 text-xl">Discover Delicious Recipes</h3>
                <form
                    encType="application/x-www-form-urlencoded"
                    method="POST"
                    action={sendForm}
                    className="mt-6"
                >
                    <label htmlFor="email" className="text-fourth mt-2 text-lg">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Joedoe@gmail.com"
                        className="sappearance-none focus:text-primary focus:outline-fourth ml-0 mt-3 block w-full rounded border-2 bg-inherit px-3 py-3 leading-tight"
                        required
                    />
                    <label htmlFor="password" className="text-fourth mt-2 text-lg">
                        Password:
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="************"
                        className="sappearance-none focus:text-primary focus:outline-fourth ml-0 mt-3 block w-full rounded border-2 bg-inherit px-3 py-3 leading-tight "
                        required
                    />
                    <button
                        type="submit"
                        className="border-fourth hover:bg-fourth text-primary m-auto ml-0 mt-4 w-full rounded-lg border-2 px-4 py-2 text-center hover:text-white lg:w-[40%]"
                        title="Button to login"
                    >
                        Login
                    </button>
                </form>
                {isLoading && (
                    <div className="mt-5 text-center">
                        <p className="text-fourth text-xl">Loading...</p>
                    </div>
                )}
                {error && (
                    <div className="mt-5 text-center">
                        <p className="text-xl text-red-700">
                            Something went wrong :( <br></br>
                            {error}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};
