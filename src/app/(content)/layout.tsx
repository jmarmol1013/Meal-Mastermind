import { NavBar } from '@components/NavBar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'MealMastermind App',
    description: 'MealMastermind app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="lg:flex">
                    <NavBar />
                    {children}
                </div>
            </body>
        </html>
    );
}
