import React from 'react';
import { getCurrentUser } from '@utils/firebase/firebase-admin';
import { redirect } from 'next/navigation';
import { RegistrationForm } from './RegistrationForm';

export default async function RegistrationPage() {
    const currentUser = await getCurrentUser();
    if (currentUser) redirect('/dashboard');

    return <RegistrationForm />;
}
