'use client';
import { signIn } from '@services/auth';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await signIn(email, password);
        if (response) router.push('/');
    };

    return (
        <div className="m-auto flex h-screen max-w-xs flex-col justify-center">
            <form
                className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
                onSubmit={handleSubmit}
            >
                <div className="mb-4">
                    <label className="mb-2 block text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                        id="email"
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
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
