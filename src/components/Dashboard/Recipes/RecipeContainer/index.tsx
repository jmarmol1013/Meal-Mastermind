import { addFavoriteRecipe, deleteFavoriteRecipe } from '@services/profile';
import { Recipe } from '@typesApp/recipes';
import { User } from '@typesApp/user';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

type Props = {
    username: string;
    recipe: Recipe;
    favorites: User['favorites'];
};

export const RecipeContainer: React.FC<Props> = ({ username, recipe, favorites }) => {
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        setIsFavorite(favorites!.includes(recipe._id));
    }, [favorites, recipe]);

    const handlerFavorite = async () => {
        const newStatus = !isFavorite;
        setIsFavorite(newStatus);

        let response;
        if (favorites?.includes(recipe._id)) {
            response = await deleteFavoriteRecipe(username, recipe._id);
        } else {
            response = await addFavoriteRecipe(username, recipe._id);
        }

        if (!response) setIsFavorite(!newStatus);
    };

    return (
        <div className="mt-12 justify-center rounded-md shadow-md hover:cursor-pointer lg:mx-[30%] lg:w-[40%]">
            <div className="flex flex-col">
                <div className="h-2 w-full rounded-t-md bg-secondary"></div>
                <div className="flex flex-col p-4">
                    <div className="flex items-center justify-between">
                        <span className="py-2 text-xl text-fourth">{recipe.title}</span>
                        <FaHeart
                            className={`${isFavorite ? 'text-red-500' : ' text-gray-200'} `}
                            size={24}
                            onClick={handlerFavorite}
                        />
                    </div>
                    <span className="py-2 text-lg text-primary">{recipe.cuisine}</span>
                    <span className="py-2 text-lg text-gray-600">
                        Calories: {recipe.nutritionalInfo[0].calories}
                    </span>
                    <span className="py-2">{recipe.description}</span>
                </div>
            </div>
        </div>
    );
};
