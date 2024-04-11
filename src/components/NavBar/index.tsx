'use client';

import React, { useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { GiKnifeFork } from 'react-icons/gi';
import { NavBarList } from './NavBarList';
import { GiCook } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { FaHeart } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { IoLogOut } from 'react-icons/io5';
import { usePathname, useRouter } from 'next/navigation';
import { signOut } from '@services/auth';

export type NavItem = {
    title: string;
    link: string;
    Icon: IconType;
};

export type NavItems = NavItem[];

export const NavBar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const [isExpanded, setExpanded] = useState<Boolean>(false);

    const logout = async () => {
        const response = await signOut();

        if (response) router.push('/login');
    };

    const changeNav = () => {
        setExpanded(!isExpanded);
    };

    const items: NavItems = [
        {
            title: 'Dashboard',
            link: '/dashboard',
            Icon: GiCook,
        },
        {
            title: 'Favorites',
            link: '/favorites',
            Icon: FaHeart,
        },
        {
            title: 'Preferences',
            link: '/Preferences',
            Icon: IoIosSettings,
        },
    ];

    return (
        <div className="flex w-full flex-wrap items-center justify-between bg-gray-100 p-6 pl-4 align-middle lg:h-screen lg:w-[25%] lg:flex-col lg:pl-10">
            <div className="flex items-center align-middle text-secondary lg:mt-4 ">
                <GiKnifeFork size={36} />
                <h1 className="ml-4 text-xl lg:text-4xl">MealMastermind Planner</h1>
            </div>
            <div className="flex justify-end text-end lg:hidden">
                <button
                    className="my-4 justify-end rounded border px-3 py-2 hover:border-secondary lg:my-6"
                    onClick={() => setExpanded(!isExpanded)}
                >
                    <RxHamburgerMenu className="h-4" />
                </button>
            </div>
            <div
                className={`${
                    isExpanded ? `block` : `hidden lg:block`
                }  w-full flex-grow text-2xl text-gray-600 lg:text-center`}
            >
                <NavBarList
                    items={items}
                    pathName={pathName}
                    logout={logout}
                    changeNav={changeNav}
                />
            </div>
            <div className="hidden lg:block">
                <button
                    className="mb-4 flex items-center align-middle hover:cursor-pointer hover:text-fourth"
                    onClick={logout}
                >
                    <IoLogOut size={24} />
                    <span className="ml-4 text-xl">Logout</span>
                </button>
            </div>
        </div>
    );
};
