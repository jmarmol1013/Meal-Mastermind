import React from 'react';
import { User } from '@typesApp/user';
import { Card } from './card';

type Props = {
    currentType: User['type'];
    setUserType: (type: User['type']) => void;
};

export type TypeInfo = {
    type: User['type'];
    description: string;
}[];

export const StepOne: React.FC<Props> = ({ currentType, setUserType }) => {
    const typeInformation: TypeInfo = [
        {
            type: 'Normal',
            description:
                'Choose this option if you have no dietary restrictions or special preferences.',
        },
        {
            type: 'Gain-weight',
            description:
                'Aims to increase calorie intake and promote weight gain through a balanced diet rich in protein, carbohydrates, and healthy fats.',
        },
        {
            type: 'Loss-weight',
            description:
                'Focuses on reducing calorie intake and promoting weight loss through portion control and healthy food choices.',
        },
        {
            type: 'Vegan',
            description: 'Follows a plant-based diet, excluding all animal products.',
        },
    ];

    return (
        <div className="mt-4">
            <h2 className="my-2 text-lg text-fourth md:text-xl">Choose Your User Type</h2>
            <span className="md:text-md text-sm text-primary">
                We&apos;re excited to personalize your experience based on your dietary preferences
                and lifestyle choices. Please select the user type that best represents your
                culinary preferences. Don&apos;t worry, you can always update your preferences
                later.
            </span>
            <div className="mx-auto mt-10 flex flex-wrap justify-center md:mt-10 md:w-[80%] ">
                <Card currentType={currentType} items={typeInformation} setUserType={setUserType} />
            </div>
        </div>
    );
};
