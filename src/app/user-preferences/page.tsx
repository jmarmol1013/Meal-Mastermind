import React from 'react';
import { getCurrentUser } from '@utils/firebase/firebase-admin';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateUserPreferences } from '@services/registration';
import { UserPreferences } from '@components/userPreferences';

export default async function UserPreferencesPage() {
    const currentUser = await getCurrentUser();
    if (!currentUser) redirect('/login');

    const username = cookies().get('username')?.value;
    const userHasPreferences = await validateUserPreferences(username!);
    if (userHasPreferences) redirect('/dashboard');

    return (
        <div className=" m-auto  flex h-screen flex-row items-center justify-center bg-sky-600">
            <div className="h-[90%] w-[90%] rounded-md bg-white shadow-md md:h-[70%] md:w-[70%]">
                <UserPreferences />
            </div>
        </div>
    );
}
