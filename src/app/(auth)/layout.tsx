import React from 'react';
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Authentication for MealMasterMind',
    description: 'Authentication for MealMasterMind',
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <html lang="en">
            <body>
                <div className=" m-auto  flex h-screen flex-row items-center justify-center bg-sky-600">
                    <div className="rounded-md bg-white p-8 shadow-md">{children}</div>
                </div>
            </body>
        </html>
        <Analytics/>
        </>
    );
}
