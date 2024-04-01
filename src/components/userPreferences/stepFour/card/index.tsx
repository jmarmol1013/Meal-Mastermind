import React from 'react';
import { AllergieInfo } from '..';
import { Allergie, User } from '@typesApp/user';

type Props = {
    currentAllergies: User['allergies'];
    allergies: AllergieInfo;
    addAllergie: (allergie: Allergie) => void;
};

export const Card: React.FC<Props> = ({ currentAllergies, allergies, addAllergie }) => {
    return allergies!.map((allergie) => {
        return (
            <div
                className={`${currentAllergies?.includes(allergie) ? ' text-secondary shadow-lg' : 'text-fourth'} flex w-1/3 flex-col rounded-md p-4 text-center align-middle transition-all duration-200 ease-out hover:cursor-pointer hover:shadow-lg focus:shadow-lg md:w-1/5`}
                key={allergie}
                onClick={() => addAllergie(allergie)}
            >
                <h3 className="text-md md:text-lg">{allergie}</h3>
            </div>
        );
    });
};
