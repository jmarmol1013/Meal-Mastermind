'use client';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { signUp } from '@services/auth';

interface RegistrationData {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

const RegistrationForm = () => {
    const formData: RegistrationData = {
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
    };

    const [user, setUser] = useState<RegistrationData>(formData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await signUp(user.email, user.password);

        if (response)
            await axios.post('http://localhost:3000/api/registration/register', {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                username: user.username,
            });
        else console.error('Error signing up');
    };

    return (
        <div className="m-auto flex h-screen max-w-xs flex-col justify-center">
            <form
                className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="firstname"
                    >
                        First Name
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="firstname"
                        type="text"
                        placeholder="First Name"
                        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                        value={user.firstName}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="lastname"
                    >
                        Last Name
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="lastname"
                        type="text"
                        placeholder="Last Name"
                        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                        value={user.lastName}
                    />
                </div>

                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        value={user.email}
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="username"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        value={user.username}
                    />
                </div>

                <div className="mb-6">
                    <label
                        className="mb-2 block text-sm font-bold text-gray-700"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="password"
                        type="password"
                        placeholder="**********"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        value={user.password}
                    />
                    {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                        type="submit"
                    >
                        Sign Up
                    </button>
                    OR
                    <Link
                        className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                        href={'/login'}
                    >
                        Sign In
                    </Link>
                </div>
            </form>
            <p className="text-center text-xs text-gray-500">
                &copy;2024 Meal Mastermind. All rights reserved.
            </p>
        </div>
    );
};

export default RegistrationForm;
