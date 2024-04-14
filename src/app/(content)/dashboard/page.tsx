import React from 'react';
import { getCurrentUser } from '@utils/firebase/firebase-admin';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateUserPreferences } from '@services/registration';
import { getProfile, getRecipes } from '@services/profile';
import { DashboardComponent } from '@components/Dashboard';

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();
    const username = cookies().get('username')?.value;
    const session = cookies().get('__session')?.value;
    if (!username || !session || !currentUser) redirect('/login');

    const userHasPreferences = await validateUserPreferences(username, session);
    if (!userHasPreferences) redirect('/user-preferences');

    const profile = await getProfile(username, session);
    const recipes = await getRecipes(username, session);
    if (!profile || !recipes) throw 'Error getting user information';
    const fullName = profile?.firstName + ' ' + profile?.lastName;

    return (
        <div className="w-full">
            <DashboardComponent
                username={username}
                fullName={fullName}
                userType={profile.type!}
                recipes={recipes}
                favorites={profile.favorites}
            />
        </div>
    );
}
