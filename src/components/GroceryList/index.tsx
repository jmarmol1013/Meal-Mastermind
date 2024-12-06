'use client';

import { Recipe } from '@typesApp/recipes';
import { User } from '@typesApp/user';
import React, { useState } from 'react';

interface ListRecipesProps {
    recipes: Recipe[];
    profile: User;
}

export const GroceryList = ({ recipes }: ListRecipesProps) => {
    const aggregatedIngredients = recipes
        .flatMap((recipe) => recipe.ingredients)
        .reduce(
            (acc, ingredient) => {
                const key = ingredient.name;
                if (acc[key]) {
                    acc[key].quantity += ingredient.quantity;
                } else {
                    acc[key] = { ...ingredient };
                }
                return acc;
            },
            {} as Record<string, { name: string; quantity: number; measure: string }>,
        );

    const ingredientsArray = Object.values(aggregatedIngredients);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    const totalPages = Math.ceil(ingredientsArray.length / itemsPerPage);

    const currentItems = ingredientsArray.slice(
        currentPage * itemsPerPage,
        currentPage * itemsPerPage + itemsPerPage,
    );

    const handleNext = () => {
        if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="m-10 lg:m-12">
            <h2 className="py-4 text-3xl">Grocery List</h2>
            <p className="text-gray-400">
                A comprehensive list of ingredients aggregated from all the recipes you’ve planned
                for this week. Navigate through the pages to view your weekly grocery needs.
            </p>
            <div className="mt-6 flex-grow overflow-y-auto rounded-md p-6 text-black shadow-md">
                <div className="flex justify-between border-b pb-4 text-xl">
                    <span>Ingredient</span>
                    <span>Quantity</span>
                </div>
                {currentItems.length === 0 ? (
                    <div className="mt-6 text-center text-lg">
                        No ingredients found. Add some recipes to generate your grocery list!
                    </div>
                ) : (
                    <ul className="mt-6">
                        {currentItems.map((ingredient, index) => (
                            <li
                                key={index}
                                className="flex justify-between border-b border-gray-400 py-4 last:border-b-0"
                            >
                                <span className="text-lg text-secondary">{ingredient.name}</span>
                                <span className="text-lg text-third">
                                    {ingredient.quantity} {ingredient.measure}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 0}
                    className={`rounded-md px-4 py-2 ${
                        currentPage === 0 ? 'bg-gray-500' : 'hover:bg-primary-dark bg-secondary'
                    } text-white`}
                >
                    ← Previous
                </button>
                <span className="text-gray-400">
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages - 1}
                    className={`rounded-md px-4 py-2 ${
                        currentPage === totalPages - 1
                            ? 'bg-gray-500'
                            : 'hover:bg-primary-dark bg-secondary'
                    } text-white`}
                >
                    Next →
                </button>
            </div>
        </div>
    );
};
