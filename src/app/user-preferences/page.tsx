import React from 'react';
import { getCurrentUser } from '@utils/firebase/firebase-admin';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateUserPreferences } from '@services/registration';
import { UserPreferencesComponent } from '@components/userPreferences';

export default async function UserPreferencesPage() {
    const currentUser = await getCurrentUser();
    if (!currentUser) redirect('/login');

    const session = cookies().get('__session')?.value;
    const username = cookies().get('username')?.value;
    if (!username || !session) redirect('/login');

    const userHasPreferences = await validateUserPreferences(username, session);
    if (userHasPreferences) redirect('/dashboard');

    return (
        <div className=" m-auto  flex h-screen flex-row items-center justify-center bg-sky-600">
            <div className="h-[90%] w-[95%] rounded-md bg-white shadow-md md:h-[70%] md:w-[70%]">
                <UserPreferencesComponent username={username!} />
            </div>
        </div>
    );
}
