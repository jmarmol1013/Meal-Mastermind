'use client';

import { UserPreferencesComponent } from '@components/userPreferences';
import { UserPreferences } from '@typesApp/user-preferences';
import Link from 'next/link';
import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

type Props = {
    username: string;
    preferences: UserPreferences;
};

export const PreferencesComponent: React.FC<Props> = ({ username, preferences }) => {
    const [changePreferences, setChangePreferences] = useState<boolean>(false);

    return changePreferences ? (
        <div>
            <button
                className="my-2 rounded-md bg-secondary p-2 text-white"
                onClick={() => setChangePreferences(false)}
            >
                <IoIosClose size={32} />
            </button>
            <UserPreferencesComponent username={username} />
        </div>
    ) : (
        <div className="mt-32 justify-center text-center lg:mt-[20%]">
            <div className="flex flex-wrap justify-center text-center lg:divide-x-2">
                <span className="px-2">
                    <span className=" text-gray-500">Type:</span> {preferences.type}
                </span>
                <span className="px-2">
                    <span className=" text-gray-500">Cuisines:</span>{' '}
                    {preferences.cuisines.join(', ')}
                </span>
                <span className="px-2">
                    <span className=" text-gray-500">Allergies:</span>
                    {preferences.allergies!.length > 1
                        ? preferences.allergies!.join(', ')
                        : ' None'}
                </span>
                <span className="px-2 text-fourth">
                    <span className=" text-gray-500">Favorites:</span>
                    <Link href={'/favorites'}> Favorites Recipes</Link>{' '}
                </span>
            </div>
            <button
                className="mt-4 rounded-md bg-secondary p-4 text-white"
                onClick={() => setChangePreferences(true)}
            >
                Change preferences
            </button>
        </div>
    );
};
