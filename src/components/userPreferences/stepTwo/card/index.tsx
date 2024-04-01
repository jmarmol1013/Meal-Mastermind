import React from 'react';
import { TypeInfo } from '..';
import { Cuisine, User } from '@typesApp/user';

type Props = {
    cuisines: User['cuisines'];
    items: TypeInfo;
    addCuisine: (cuisine: Cuisine) => void;
};

export const Card: React.FC<Props> = ({ cuisines, items, addCuisine }) => {
    return items?.map((item) => {
        return (
            <div
                className={`${cuisines?.includes(item) ? ' text-secondary shadow-lg' : 'text-fourth'} flex w-1/2 flex-col rounded-md p-4 text-center align-middle transition-all duration-200 ease-out hover:cursor-pointer hover:shadow-lg focus:shadow-lg md:w-1/5`}
                key={item}
                onClick={() => addCuisine(item)}
            >
                <h3 className="text-md  md:text-lg">{item}</h3>
            </div>
        );
    });
};
