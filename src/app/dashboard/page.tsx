import React from 'react';
import { getCurrentUser } from '@utils/firebase/firebase-admin';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { validateUserPreferences } from '@services/registration';
import { getProfile } from '@services/profile';

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();
    const username = cookies().get('username')?.value;
    const session = cookies().get('__session')?.value;
    if (!username || !session || !currentUser) redirect('/login');

    const userHasPreferences = await validateUserPreferences(username, session);
    if (!userHasPreferences) redirect('/user-preferences');

    const profile = await getProfile(username, session);

    return <div>Dashboard</div>;
}
