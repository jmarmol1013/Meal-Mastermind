import React, { useEffect, useState } from 'react';
import { User } from '@typesApp/user';
import { Card } from './card';
import { Recipe } from '@typesApp/recipes';
import { getRandomRecipes } from '@services/userPreferences';

type Props = {
    userType: User['type'];
    cuisines: User['cuisines'];
    favRecipes: Recipe['_id'][];
    addRecipe: (recipe: Recipe['_id']) => void;
};

export type TypeInfo = User['cuisines'];

export const StepThree: React.FC<Props> = ({ cuisines, favRecipes, userType, addRecipe }) => {
    const [recipes, setRecipes] = useState<Recipe[]>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getRecipes = async () => {
            const data: Recipe[] | null = await getRandomRecipes(cuisines!, userType!);
            if (data) setRecipes(data);
        };

        getRecipes();
        setLoading(false);
    }, [cuisines, userType]);

    return (
        <div className="mt-4">
            <h2 className="my-2 text-lg text-fourth md:text-xl">Choose Your Favorite Recipes</h2>
            <span className="md:text-md text-sm text-primary">
                Let&apos;s make your MealMastermind experience even more delicious! Select at least
                5 of your favorite recipes from the cuisines you&apos;ve chosen earlier. These
                recipes will help our algorithm understand your taste preferences better and suggest
                personalized recommendations that you&apos;ll love. Browse through the options below
                and select the dishes that make your taste buds dance!
            </span>
            <div className="mx-auto mt-6 flex flex-wrap justify-center md:mt-16 md:w-[90%] ">
                {loading ? (
                    <span className="text-center text-xl text-primary">Loading ...</span>
                ) : (
                    <Card favRecipes={favRecipes} recipes={recipes!} addRecipe={addRecipe} />
                )}
            </div>
        </div>
    );
};
