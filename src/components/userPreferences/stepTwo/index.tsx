import React from 'react';
import { Cuisine, User } from '@typesApp/user';
import { Card } from './card';

type Props = {
    cuisines: User['cuisines'];
    addCuisine: (cuisine: Cuisine) => void;
};

export type TypeInfo = User['cuisines'];

export const StepTwo: React.FC<Props> = ({ cuisines, addCuisine }) => {
    const typeInformation: TypeInfo = [
        'Italian',
        'Mexican',
        'Chinese',
        'Indian',
        'Japanese',
        'Thai',
        'Mediterranean',
        'French',
        'Greek',
    ];

    return (
        <div className="mt-4">
            <h2 className="my-2 text-lg text-fourth md:text-xl">Choose Your Favorite Cuisines</h2>
            <span className="md:text-md text-sm text-primary">
                Let&apos;s spice things up! Select your favorite cuisines to tailor your
                MealMastermind experience to your taste buds. Whether you crave the bold flavors of
                Mexican cuisine or the comforting warmth of Italian dishes, we&apos;ve got you
                covered. Choose one or more cuisines that make your mouth water!
            </span>
            <div className="mx-auto mt-16 flex flex-wrap justify-center md:mt-16 md:w-[80%] ">
                <Card cuisines={cuisines} items={typeInformation} addCuisine={addCuisine} />
            </div>
        </div>
    );
};
