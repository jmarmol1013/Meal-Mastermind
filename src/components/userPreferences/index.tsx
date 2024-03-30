'use client';

import React, { useState } from 'react';
import { StepOne } from './stepOne';
import { User } from '@typesApp/user';

export const UserPreferences = () => {
    const [step, setStep] = useState<number>(1);
    const [userType, setUserType] = useState<User['type']>();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const nextStep = () => {
        if (step == 1 && userType == null) {
            setErrorMessage('Please select one user type');
            return;
        } else setErrorMessage(null);

        setStep((prevStep) => prevStep + 1);
    };

    const changeUserType = (type: User['type']) => {
        setUserType(type);
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
                ) : null}
                <div className="mt-16 flex justify-center ">
                    <button
                        className="rounded-md border-2 border-secondary px-4 py-2 text-primary transition-all duration-200 ease-out hover:bg-secondary hover:text-white"
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
