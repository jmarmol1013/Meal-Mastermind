'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <>
            <h2 className="text-secondary text-4xl">Welcome back to MealMastermind</h2>
            <h3 className="text-fifth pt-2 text-xl">Discover Delicious Recipes</h3>
            <div className="mt-5 text-center">
                <p className="text-xl text-red-700">
                    Something went wrong :( <br></br>
                    {error.message}
                </p>
                <button
                    className="border-fourth hover:bg-fourth text-primary m-auto ml-0 mt-4 w-full rounded-lg border-2 px-4 py-2 text-center hover:text-white lg:w-[40%]"
                    title="Button to retry"
                    onClick={() => reset()}
                >
                    Try again
                </button>
            </div>
        </>
    );
}
