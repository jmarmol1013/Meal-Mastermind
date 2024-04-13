'use client';

import { RecipeContainer } from '@components/Dashboard/Recipes/RecipeContainer';
import { Recipe } from '@typesApp/recipes';
import React from 'react';

type Props = {
    username: string;
    favoritesRecipes: Recipe[];
};

export const FavoritesComponent: React.FC<Props> = ({ username, favoritesRecipes }) => {
    const favoritesId = favoritesRecipes.map((recipe) => recipe._id);

    return (
        <div className="m-6 lg:m-24">
            <span className="py-4 text-xl text-gray-500">Here are your favorites recipes!</span>
            <h2 className="py-4 text-3xl">Favorites Recipes</h2>
            <span className="py-4 text-gray-500">
                Here, you can view and manage all the recipes you&apos;ve selected as your
                favorites. These recipes are more than just a list—they&apos;re the key ingredients
                that help our algorithm understand your unique tastes and preferences. By curating
                your favorite recipes, you&apos;re actively shaping the personalized recipe
                recommendations you&apos;ll receive. So go ahead, explore your favorites, and keep
                discovering new culinary delights with MealMastermind!
            </span>
            <div className="flex flex-wrap justify-center">
                {favoritesRecipes.map((recipe, index) => {
                    return (
                        <RecipeContainer
                            key={index}
                            username={username}
                            recipe={recipe}
                            favorites={favoritesId}
                        />
                    );
                })}
            </div>
        </div>
    );
};
