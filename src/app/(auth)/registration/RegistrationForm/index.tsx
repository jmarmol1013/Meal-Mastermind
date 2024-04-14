'use client';

import { signUp } from '@services/auth';
import { registration } from '@services/registration';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';

export type RegistrationFormDto = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};

export const RegistrationForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>();

    const sendForm = async (formData: FormData) => {
        setIsLoading(true);

        const user: RegistrationFormDto = {
            firstName: formData.get('firstName')!.toString(),
            lastName: formData.get('lastName')!.toString(),
            username: formData.get('username')!.toString(),
            email: formData.get('email')!.toString(),
            password: formData.get('password')!.toString(),
        };

        try {
            const signedIn = await signUp(user.email, user.password);
            if (!signedIn) {
                throw new Error('Error');
            }

            const register = await registration(user);
            if (!register) {
                throw new Error('Error');
            }
        } catch (e) {
            setError(`Error in registration in please try again`);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);
        redirect('/user-preferences');
    };

    return (
        <>
            <h2 className="text-secondary text-4xl">Join MealMastermind Today!</h2>
            <h3 className="text-fifth pt-2 text-xl">Unlock a World of Culinary Delights</h3>
            <form
                encType="application/x-www-form-urlencoded"
                method="POST"
                action={sendForm}
                className="mt-6"
            >
                <div className="flex flex-row">
                    <div className="mr-2 w-1/2">
                        <label htmlFor="first name" className="text-fourth mt-2 text-lg">
                            First name:
                        </label>
                        <input
                            type="Text"
                            name="firstName"
                            placeholder="Joe"
                            className="sappearance-none focus:text-primary focus:outline-fourth my-2 ml-0 block w-full rounded border-2 bg-inherit px-3 py-3 leading-tight"
                            required
                        />
                    </div>
                    <div className="ml-2 w-1/2">
                        <label htmlFor="last name" className="text-fourth mt-2 text-lg">
                            Last name:
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                            className="sappearance-none focus:text-primary focus:outline-fourth my-2 ml-0 block w-full rounded border-2 bg-inherit px-3 py-3 leading-tight"
                            required
                        />
                    </div>
                </div>
                <label htmlFor="username" className="text-fourth mt-2 text-lg">
                    Username:
                </label>
                <input
                    type="text"
                    name="username"
                    placeholder="joedoe123"
                    className="sappearance-none focus:text-primary focus:outline-fourth my-2 ml-0 block w-full rounded border-2 bg-inherit px-3 py-3 leading-tight"
                    required
                />
                <label htmlFor="email" className="text-fourth mt-2 text-lg">
                    Email:
                </label>
                <input
                    type="email"
                    name="email"
                    placeholder="Joedoe@gmail.com"
                    className="sappearance-none focus:text-primary focus:outline-fourth my-2 ml-0 block w-full rounded border-2 bg-inherit px-3 py-3 leading-tight"
                    required
                />
                <label htmlFor="password" className="text-fourth mt-2 text-lg">
                    Password:
                </label>
                <input
                    type="password"
                    name="password"
                    placeholder="************"
                    className="sappearance-none focus:text-primary focus:outline-fourth my-2 ml-0 block w-full rounded border-2 bg-inherit px-3 py-3 leading-tight "
                    required
                />
                <button
                    type="submit"
                    className="border-fourth hover:bg-fourth text-primary m-auto ml-0 mt-4 w-full rounded-lg border-2 px-4 py-2 text-center hover:text-white lg:w-[40%]"
                    title="Button to login"
                >
                    Register
                </button>
            </form>
            <Link href={'/login'}>
                <div className="mt-5 text-center hover:cursor-pointer">
                    <p className=" text-md text-slate-400">Already have an account?</p>
                </div>
            </Link>
            {isLoading && (
                <div className="mt-5 text-center transition ease-in">
                    <p className="text-fourth text-xl">Loading...</p>
                </div>
            )}
            {error && (
                <div className="mt-5 text-center">
                    <p className="text-xl text-red-700 transition ease-in">
                        Something went wrong :( <br></br>
                        {error}
                    </p>
                </div>
            )}
        </>
    );
};
