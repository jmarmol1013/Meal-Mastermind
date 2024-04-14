import { redirect } from 'next/navigation';
import { LoginForm } from './LoginForm';
import { getCurrentUser } from '@utils/firebase/firebase-admin';

export default async function LoginPage() {
    const currentUser = await getCurrentUser();
    if (currentUser) redirect('/dashboard');

    return <LoginForm />;
}
