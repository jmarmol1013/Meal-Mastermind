import React from 'react';
import { getCurrentUser } from '@utils/firebase/firebase-admin';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateUserPreferences } from '@services/registration';
import { getProfile, getRecipes } from '@services/profile';
import { ListRecipes } from '@components/ListRecipes';

export default async function Page() {
    const currentUser = await getCurrentUser();
    const username = cookies().get('username')?.value;
    const session = cookies().get('__session')?.value;
    if (!username || !session || !currentUser) redirect('/login');

    const userHasPreferences = await validateUserPreferences(username, session);
    if (!userHasPreferences) redirect('/user-preferences');

    const profile = await getProfile(username, session);
    const recipes = await getRecipes(username, session);
    if (!profile || !recipes) throw 'Error getting user information';

    return (
        <div className="w-full">
            <ListRecipes recipes={recipes} profile={profile} />
        </div>
    );
}
