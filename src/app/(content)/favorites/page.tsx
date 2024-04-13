import React from 'react';
import { getCurrentUser } from '@utils/firebase/firebase-admin';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getFavoritesRecipes } from '@services/profile';
import { FavoritesComponent } from '@components/Favorites/indext';

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();
    const username = cookies().get('username')?.value;
    const session = cookies().get('__session')?.value;
    if (!username || !session || !currentUser) redirect('/login');

    const favoritesRecipes = await getFavoritesRecipes(username, session);
    if (!favoritesRecipes) throw 'Error getting user favorites session';

    return (
        <div className="w-full">
            <FavoritesComponent username={username} favoritesRecipes={favoritesRecipes} />
        </div>
    );
}
