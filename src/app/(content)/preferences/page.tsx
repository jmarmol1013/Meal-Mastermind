import React from 'react';
import { getCurrentUser } from '@utils/firebase/firebase-admin';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { PreferencesComponent } from '@components/Preferences';
import { getUserPreferences } from '@services/userPreferences';

export default async function DashboardPage() {
    const currentUser = await getCurrentUser();
    const username = cookies().get('username')?.value;
    const session = cookies().get('__session')?.value;
    if (!username || !session || !currentUser) redirect('/login');

    const preferences = await getUserPreferences(username, session);
    if (!preferences) throw 'Error getting user favorites session';

    return (
        <div className="w-full">
            <div className="m-6 lg:m-10">
                <span className="py-2 text-xl text-gray-500">Here are your preferences!</span>
                <h2 className="py-2 text-3xl">User Preferences</h2>
                <span className="py-2 text-gray-500">
                    Here, you have the power to fine-tune your MealMastermind experience. Whether
                    you want to adjust your user type, update your favorite cuisines, or refine your
                    allergy selections, every change you make here directly impacts the recipes we
                    recommend to you. By updating your preferences, you&apos;re ensuring that
                    MealMastermind continues to deliver personalized recipe suggestions that
                    perfectly match your tastes and dietary needs. So go ahead, make any adjustments
                    you like, and get ready to embark on a culinary journey tailored just for you!
                </span>
                <PreferencesComponent username={username} preferences={preferences} />
            </div>
        </div>
    );
}
