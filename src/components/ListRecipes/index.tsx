'use client';

import { Recipe } from '@typesApp/recipes';
import { User } from '@typesApp/user';
import { ObjectId } from 'mongoose';
import React, { useState } from 'react';

interface ListRecipesProps {
    recipes: Recipe[];
    profile: User;
}

export const ListRecipes = ({ recipes }: ListRecipesProps) => {
    const [recipeList, setRecipeList] = useState<Recipe[]>(recipes);

    const handleDelete = (id: ObjectId) => {
        const updatedRecipes = recipeList.filter((recipe) => recipe._id !== id);
        setRecipeList(updatedRecipes);
    };

    return (
        <div className="m-10 lg:m-12">
            <h2 className="py-4 text-3xl">Manage Recipes</h2>
            <p className="text-gray-400">
                Here you can view, add, edit, and delete recipes. Easily manage your collection of
                recipes and keep them organized.
            </p>
            <div className="p-4">
                <h1 className="mb-4 text-xl font-bold">Recipes</h1>
                <table className=" min-w-full table-auto rounded-xl  shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="  px-4 py-2 text-left">Title</th>
                            <th className="  px-4 py-2 text-left">Cuisine</th>
                            <th className="  px-4 py-2 text-left">Description</th>
                            <th className="  px-4 py-2 text-left">Type</th>
                            <th className="  px-4 py-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipeList.map((recipe) => (
                            <tr key={recipe._id.toString()} className="hover:bg-gray-50">
                                <td className="  px-4 py-2">{recipe.title}</td>
                                <td className="  px-4 py-2">{recipe.cuisine}</td>
                                <td className="  px-4 py-2">{recipe.description}</td>
                                <td className="  px-4 py-2">{recipe.type}</td>
                                <td className="  px-4 py-2 text-center">
                                    <button
                                        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        onClick={() => handleDelete(recipe._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
