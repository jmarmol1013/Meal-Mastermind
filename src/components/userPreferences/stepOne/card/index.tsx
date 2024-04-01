import React from 'react';
import { TypeInfo } from '..';
import { User } from '@typesApp/user';

type Props = {
    currentType: User['type'];
    items: TypeInfo;
    setUserType: (type: User['type']) => void;
};

export const Card: React.FC<Props> = ({ currentType, items, setUserType }) => {
    return items.map((item) => {
        return (
            <div
                className={`${currentType == item.type ? ' text-secondary shadow-lg' : 'text-fourth'} flex w-1/2 flex-col rounded-md p-4 align-middle transition-all duration-200 ease-out hover:cursor-pointer hover:shadow-lg focus:shadow-lg`}
                key={item.type}
                onClick={() => setUserType(item.type)}
            >
                <h3 className="text-md md:text-lg">{item.type}</h3>
                <span className="md:text-md text-sm text-primary">{item.description}</span>
            </div>
        );
    });
};
