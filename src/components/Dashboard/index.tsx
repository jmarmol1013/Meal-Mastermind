import { Recipe } from '@typesApp/recipes';
import { getFormattedToday, getWeekDate } from '@utils/week';
import React from 'react';
import { PiCookingPotFill } from 'react-icons/pi';
import { Recipes } from './Recipes';
import { User } from '@typesApp/user';

type Props = {
    username: string;
    fullName: string;
    userType: string;
    recipes: Recipe[];
    favorites: User['favorites'];
};

export const DashboardComponent: React.FC<Props> = async ({
    username,
    fullName,
    userType,
    recipes,
    favorites,
}) => {
    const weekDate = getWeekDate();
    const todayDate = getFormattedToday();

    const calories = recipes.reduce((acummulator, recipe) => {
        return acummulator + recipe.nutritionalInfo[0].calories;
    }, 0);

    const protein = recipes.reduce((acummulator, recipe) => {
        return acummulator + recipe.nutritionalInfo[0].protein;
    }, 0);

    const fats = recipes.reduce((acummulator, recipe) => {
        return acummulator + recipe.nutritionalInfo[0].fats;
    }, 0);

    const carbohydrates = recipes.reduce((acummulator, recipe) => {
        return acummulator + recipe.nutritionalInfo[0].carbohydrate;
    }, 0);

    return (
        <div className="m-10 lg:m-12">
            <div className="flex flex-col lg:flex-row">
                <div className=" lg:w-[40%]">
                    <span className="py-4 text-xl text-gray-500">
                        Hi {fullName}, let&apos;s plan your week{' '}
                    </span>
                    <h2 className="py-4 text-3xl">Meal Planner</h2>
                    <div className="flex items-center py-4 align-middle text-gray-500">
                        <PiCookingPotFill size={24} />
                        <span className="pl-4  text-xl">{weekDate}</span>
                    </div>
                    <div className="mt-4 flex flex-col rounded-md bg-secondary p-6 text-white shadow-md">
                        <span className="my-2 text-lg">Current Week</span>
                        <span className="my-4 text-2xl">{todayDate}</span>
                    </div>
                </div>
                <div className="flex flex-col lg:ml-4 lg:w-[60%]">
                    <div className="mt-8 lg:text-right">
                        <span className="text-4xl text-third">{userType} User</span>
                    </div>
                    <div className="mt-6 align-middle lg:mt-36">
                        <div className="flex flex-wrap justify-center text-center">
                            <div className="flex w-1/2 flex-col py-2 lg:w-1/5">
                                <span className="text-gray-500">Goals</span>
                                <span className="text-xl text-fourth">This week</span>
                            </div>
                            <div className="flex w-1/2 flex-col py-2 lg:w-1/5">
                                <span className="text-gray-500">Calories</span>
                                <span className="text-xl text-primary">{calories}</span>
                            </div>
                            <div className="flex w-1/2 flex-col py-2 lg:w-1/5">
                                <span className="text-gray-500">Protein</span>
                                <span className="text-xl text-secondary">{protein}</span>
                            </div>
                            <div className="flex w-1/2 flex-col py-2 lg:w-1/5">
                                <span className="text-gray-500">Fats</span>
                                <span className="text-xl text-third">{fats}</span>
                            </div>
                            <div className="flex w-1/2 flex-col py-2 lg:w-1/5">
                                <span className="text-gray-500">Carbohydates</span>
                                <span className="text-xl text-fifth">{carbohydrates}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Recipes username={username} recipes={recipes} favorites={favorites} />
        </div>
    );
};
