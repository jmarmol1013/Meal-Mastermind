'use client';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(userName, password);
        try {
            const response = await axios.post('/api/auth/sign-in', {
                username: userName,
                password: password,
            });

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
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
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="username"
                        type="text"
                        placeholder="Username"
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
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
                        placeholder="******************"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
                        type="submit"
                    >
                        Sign In
                    </button>
                    OR
                    <Link
                        className="inline-block align-baseline text-sm font-bold text-blue-500 hover:text-blue-800"
                        href={'/register'}
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
            <p className="text-center text-xs text-gray-500">
                &copy;2024 Meal Mastermind. All rights reserved.
            </p>
        </div>
    );
};

export default LoginForm;
