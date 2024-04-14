import React from 'react';
import { NavItems } from '..';
import { NavBarListItem } from '../NavBarListItem';
import { IoLogOut } from 'react-icons/io5';

type Props = {
    items: NavItems;
    pathName: string;
    logout: () => void;
    changeNav: () => void;
};

export const NavBarList: React.FC<Props> = ({ items, pathName, logout, changeNav }) => {
    return (
        <div className="flex flex-col items-center justify-center lg:ml-4 lg:h-full lg:text-left">
            <div className="w-[50%] divide-y-2 lg:w-full lg:divide-y-0">
                {items
                    ? items.map((item, index) => (
                          <NavBarListItem
                              key={index}
                              item={item}
                              pathName={pathName}
                              logout={logout}
                              changeNav={changeNav}
                          />
                      ))
                    : null}
            </div>
            <button
                className="mt-4 flex items-center align-middle hover:cursor-pointer hover:text-fourth lg:mb-4 lg:mt-0 lg:hidden"
                onClick={logout}
            >
                <IoLogOut size={24} />
                <span className="ml-4 text-lg lg:text-xl">Logout</span>
            </button>
        </div>
    );
};
