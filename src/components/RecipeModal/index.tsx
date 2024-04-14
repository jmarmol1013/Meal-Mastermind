import { Recipe } from '@typesApp/recipes';
import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { FaFire, FaMinus, FaPlus } from 'react-icons/fa';
import { FaBreadSlice } from 'react-icons/fa6';
import { GiMeat } from 'react-icons/gi';
import { TbSalt } from 'react-icons/tb';
import { IoFastFood } from 'react-icons/io5';

type Props = {
    recipe: Recipe;
    closeModal: () => void;
};

export const RecipeModal: React.FC<Props> = ({ recipe, closeModal }) => {
    const [servings, setServings] = useState<number>(1);

    return (
        <div className="fixed inset-0 flex cursor-default items-start justify-center overflow-auto bg-black bg-opacity-50 p-4 lg:items-center">
            <div
                className="relative w-full overflow-y-auto rounded-lg bg-gray-200 p-6 shadow-xl lg:ml-[20%] lg:w-[60%]"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="text-right">
                    <button className="rounded-md bg-secondary p-2 text-white" onClick={closeModal}>
                        <IoIosClose size={32} />
                    </button>
                </div>
                <div className="mt-4 flex flex-col rounded-lg bg-white p-4">
                    <h1 className="mt-4 text-3xl text-fourth">{recipe.title}</h1>
                    <span className="mt-4 text-xl text-third">
                        {recipe.cuisine} - {recipe.type} type
                    </span>
                    <span className="mt-4 text-lg text-gray-500">{recipe.description}</span>
                    <div className="mt-4 flex flex-wrap justify-center divide-x-2 text-center">
                        <div className="flex items-center justify-center px-4">
                            <FaFire className="text-xl" />
                            <div className="pl-2">
                                <span className="flex text-gray-500">Kcals</span>
                                <span className="font-bold">
                                    {recipe.nutritionalInfo[0].calories}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center px-4">
                            <FaBreadSlice className="text-xl" />
                            <div className="pl-2">
                                <span className="flex text-gray-500">Carbs</span>
                                <span className="font-bold">
                                    {recipe.nutritionalInfo[0].carbohydrate}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center px-4">
                            <GiMeat className="text-3xl" />
                            <div className="pl-2">
                                <span className="flex text-gray-500">Protein</span>
                                <span className="font-bold">
                                    {recipe.nutritionalInfo[0].protein}
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center px-4">
                            <IoFastFood size={24} />
                            <div className="pl-2">
                                <span className="flex text-gray-500">Fat</span>
                                <span className="font-bold">{recipe.nutritionalInfo[0].fats}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center px-4">
                            <TbSalt size={24} />
                            <div className="pl-2">
                                <span className="flex text-gray-500">Sodium</span>
                                <span className="font-bold">
                                    {recipe.nutritionalInfo[0].sodium}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center lg:flex-row">
                    <div className="mt-4 flex flex-col divide-y-2 rounded-lg bg-white p-6 lg:mr-4 lg:w-[60%]">
                        <span className="text-2xl">How to make it</span>
                        <div>
                            {recipe.steps.map((step, index) => {
                                return (
                                    <div className="mt-4 flex items-center" key={index}>
                                        <div className="rounded-md bg-red-200 p-4">
                                            <span className="text-2xl text-red-500">
                                                0{index + 1}
                                            </span>
                                        </div>
                                        <div className="ml-4">
                                            <span className="text-gray-500">{step}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="mt-4 flex w-full flex-col rounded-lg bg-white p-4 lg:ml-4 lg:w-[40%]">
                        <span className="text-2xl">Ingredients</span>
                        <div className="mt-4 flex items-center">
                            <div className="rounded-md bg-slate-300">
                                <button
                                    className="mr-2 rounded-md p-2"
                                    onClick={() => setServings(servings - 1)}
                                >
                                    <FaMinus />
                                </button>
                                <span className="mx-2">Servings {servings}</span>
                                <button
                                    className="ml-2 rounded-md bg-fourth p-2 text-white"
                                    onClick={() => setServings(servings + 1)}
                                >
                                    <FaPlus />
                                </button>
                            </div>
                        </div>
                        <div className="mt-2">
                            <div className="flex flex-col pl-2">
                                {recipe.ingredients.map((ingredient, index) => {
                                    return (
                                        <span className="my-2" key={index}>
                                            {ingredient.quantity * servings} {ingredient.measure}{' '}
                                            {ingredient.name}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
