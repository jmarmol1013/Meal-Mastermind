'use client';

import React, { useState } from 'react';
import { StepOne } from './stepOne';
import { Cuisine, User } from '@typesApp/user';
import { StepTwo } from '@components/userPreferences/stepTwo';

export const UserPreferences = () => {
    const [step, setStep] = useState<number>(1);
    const [userType, setUserType] = useState<User['type']>();
    const [cuisines, setCuisines] = useState<User['cuisines']>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const nextStep = () => {
        if (step == 1 && userType == null) {
            setErrorMessage('Please select one user type');
            return;
        } else setErrorMessage(null);

        if (step == 2 && cuisines?.length == 0) {
            setErrorMessage('Please select at least one cuisine');
            return;
        } else setErrorMessage(null);

        setStep((prevStep) => prevStep + 1);
    };

    const backStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    const changeUserType = (type: User['type']) => {
        setUserType(type);
    };

    const addCuisine = (cuisine: Cuisine) => {
        setCuisines((prevCuisines = []) => {
            const cuisineExists = prevCuisines.includes(cuisine);

            if (cuisineExists) {
                return prevCuisines.filter((c) => c !== cuisine);
            } else {
                return [...prevCuisines, cuisine];
            }
        });
    };

    return (
        <>
            <div
                className={`${step == 1 ? 'w-1/4 rounded-e-md rounded-tl-md' : step === 2 ? 'w-1/2 rounded-e-md rounded-tl-md' : step === 3 ? 'w-3/4 rounded-e-md rounded-tl-md' : 'w-full rounded-t-md'} h-3 bg-fourth `}
            ></div>
            <div className="mx-[5%] my-8 w-[90%]">
                <div className="flex justify-between">
                    <h1 className=" text-xl text-secondary md:text-3xl">User Preferences</h1>
                    <span className="text-lg text-fourth md:text-2xl">Step {step}</span>
                </div>
                {step === 1 ? (
                    <StepOne currentType={userType} setUserType={changeUserType} />
                ) : step === 2 ? (
                    <StepTwo cuisines={cuisines} addCuisine={addCuisine} />
                ) : null}
                <div className="mt-16 flex justify-center ">
                    {step > 1 && (
                        <button
                            className="mx-4 rounded-md border-2 border-primary px-4 py-2 text-primary transition-all duration-200 ease-out hover:bg-primary hover:text-white"
                            onClick={() => backStep()}
                        >
                            Back
                        </button>
                    )}
                    <button
                        className="mx-4 rounded-md border-2 border-secondary px-4 py-2 text-primary transition-all duration-200 ease-out hover:bg-secondary hover:text-white"
                        onClick={() => nextStep()}
                    >
                        Next
                    </button>
                </div>
                {errorMessage && (
                    <div className="mx-auto mt-4 justify-center text-center">
                        <span className="text-red-700 transition ease-in">{errorMessage}</span>
                    </div>
                )}
            </div>
        </>
    );
};
