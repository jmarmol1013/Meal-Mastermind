import React from 'react';
import { NavItem } from '..';
import Link from 'next/link';

type Props = {
    item: NavItem;
    pathName: string;
    logout: () => void;
    changeNav: () => void;
};

export const NavBarListItem: React.FC<Props> = ({ item, pathName, changeNav }) => {
    return (
        <Link
            href={item.link}
            className={`${pathName == item.link ? 'text-fourth' : ''} flex items-center justify-center py-2 text-center align-middle transition delay-150 ease-in-out hover:cursor-pointer hover:text-fourth lg:mr-4 lg:py-4 lg:text-left`}
            onClick={changeNav}
        >
            <item.Icon size={24} />
            <span className="ml-4 text-lg lg:text-2xl">{item.title}</span>
        </Link>
    );
};
