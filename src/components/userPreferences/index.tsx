'use client';

import React, { useState } from 'react';
import { StepOne } from './stepOne';
import { Allergie, Cuisine, User } from '@typesApp/user';
import { StepTwo } from '@components/userPreferences/stepTwo';
import { StepThree } from './stepThree';
import { Recipe } from '@typesApp/recipes';
import { StepFour } from './stepFour';
import { updatePreferences, updateRecipes } from '@services/userPreferences';
import { useRouter } from 'next/navigation';

type Props = {
    username: string;
};

export const UserPreferences: React.FC<Props> = ({ username }) => {
    const router = useRouter();
    const [step, setStep] = useState<number>(1);
    const [userType, setUserType] = useState<User['type']>();
    const [cuisines, setCuisines] = useState<User['cuisines']>([]);
    const [recipes, setRecipes] = useState<Recipe['_id'][]>([]);
    const [allergies, setAllergies] = useState<User['allergies']>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>();

    const nextStep = () => {
        if (step == 1 && userType == null) {
            setErrorMessage('Please select one user type');
            return;
        } else setErrorMessage(null);

        if (step == 2 && cuisines?.length == 0) {
            setErrorMessage('Please select at least one cuisine');
            return;
        } else setErrorMessage(null);

        if (step == 3 && recipes?.length < 5) {
            setErrorMessage('Please select at least five cuisine');
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

    const addRecipe = (recipeId: Recipe['_id']) => {
        setRecipes((prevRecipe = []) => {
            const cuisineExists = prevRecipe.includes(recipeId);

            if (cuisineExists) {
                return prevRecipe.filter((r) => r !== recipeId);
            } else {
                return [...prevRecipe, recipeId];
            }
        });
    };

    const addAllergie = (allergie: Allergie) => {
        setAllergies((prevAllergies = []) => {
            const cuisineExists = prevAllergies.includes(allergie);

            if (cuisineExists) {
                return prevAllergies.filter((a) => a !== allergie);
            } else {
                return [...prevAllergies, allergie];
            }
        });
    };

    const setPreferences = async () => {
        setLoading(true);

        const sentPreferences = await updatePreferences(
            username!,
            userType,
            cuisines,
            recipes,
            allergies,
        );

        const recipesUpdated = await updateRecipes(username);

        setLoading(false);
        if (sentPreferences && recipesUpdated) {
            setErrorMessage(null);
            router.push('/dashboard');
            return;
        }

        setErrorMessage('Error updating your preferences :( Please try again');
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
                ) : step === 3 ? (
                    <StepThree
                        userType={userType}
                        favRecipes={recipes}
                        cuisines={cuisines}
                        addRecipe={addRecipe}
                    />
                ) : step === 4 ? (
                    <StepFour currentAllergies={allergies} addAllergie={addAllergie} />
                ) : null}
                <div className="mt-10 flex justify-center md:mt-16 ">
                    {step > 1 && (
                        <button
                            className="mx-4 rounded-md border-2 border-primary px-4 py-2 text-primary transition-all duration-200 ease-out hover:bg-primary hover:text-white"
                            onClick={() => backStep()}
                        >
                            Back
                        </button>
                    )}
                    {step < 4 ? (
                        <button
                            className="mx-4 rounded-md border-2 border-secondary px-4 py-2 text-primary transition-all duration-200 ease-out hover:bg-secondary hover:text-white"
                            onClick={() => nextStep()}
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            className="mx-4 rounded-md border-2 border-secondary px-4 py-2 text-primary transition-all duration-200 ease-out hover:bg-secondary hover:text-white"
                            onClick={() => setPreferences()}
                        >
                            Done
                        </button>
                    )}
                </div>
                {loading && (
                    <div className="mx-auto mt-4 justify-center text-center">
                        <span className="text-primary transition ease-in">Loading...</span>
                    </div>
                )}
                {errorMessage && (
                    <div className="mx-auto mt-4 justify-center text-center">
                        <span className="text-red-700 transition ease-in">{errorMessage}</span>
                    </div>
                )}
            </div>
        </>
    );
};
