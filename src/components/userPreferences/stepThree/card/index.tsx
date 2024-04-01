import React from 'react';
import { Recipe } from '@typesApp/recipes';

type Props = {
    favRecipes: Recipe['_id'][];
    recipes: Recipe[];
    addRecipe: (recipe: Recipe['_id']) => void;
};

export const Card: React.FC<Props> = ({ favRecipes, recipes, addRecipe }) => {
    return recipes?.map((recipe) => {
        return (
            <div
                className={`${favRecipes?.includes(recipe._id) ? ' text-secondary shadow-lg' : 'text-fourth'} Text-center flex w-1/4 flex-col rounded-md p-2 align-middle transition-all duration-200 ease-out hover:cursor-pointer hover:shadow-lg focus:shadow-lg md:w-1/5 md:p-4`}
                key={recipe.title}
                onClick={() => addRecipe(recipe._id)}
            >
                <h3 className="text-md md:text-lg">{recipe.title}</h3>
                <span className="md:text-md text-sm text-primary">{recipe.cuisine}</span>
            </div>
        );
    });
};
