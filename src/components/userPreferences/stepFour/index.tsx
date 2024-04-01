import React from 'react';
import { Allergie, User } from '@typesApp/user';
import { Card } from './card';

type Props = {
    currentAllergies: User['allergies'];
    addAllergie: (allergie: Allergie) => void;
};

export type AllergieInfo = User['allergies'];

export const StepFour: React.FC<Props> = ({ currentAllergies, addAllergie }) => {
    const allergieInfo: AllergieInfo = [
        'Peanuts',
        'Tree nuts (such as almonds, cashews, walnuts)',
        'Shellfish (such as shrimp, crab, lobster)',
        'Fish',
        'Milk',
        'Eggs',
        'Wheat',
        'Soy',
        'Sesame',
        'Sulfites',
    ];

    return (
        <div className="mt-4">
            <h2 className="my-2 text-lg text-fourth md:text-xl">Choose Your Allergies</h2>
            <span className="md:text-md text-sm text-primary">
                Your health and safety are important to us! Please let us know if you have any food
                allergies or dietary restrictions. Select any allergies from the list below to
                ensure that we can provide you with safe and suitable recipe recommendations.
            </span>
            <div className="mx-auto mt-16 flex flex-wrap justify-center md:mt-16 md:w-[80%] ">
                <Card
                    allergies={allergieInfo}
                    currentAllergies={currentAllergies}
                    addAllergie={addAllergie}
                />
            </div>
        </div>
    );
};
