'use client';

import React, { useState } from 'react';
import { Calendar } from './Calendar';
import { Recipe } from '@typesApp/recipes';
import { RecipeContainer } from './RecipeContainer';
import { User } from '@typesApp/user';

type Props = {
    username: string;
    recipes: Recipe[];
    favorites: User['favorites'];
};

export const Recipes: React.FC<Props> = ({ username, recipes, favorites }) => {
    const today = new Date();
    const todayDay = today.getDate();
    const [day, setDay] = useState<number>(todayDay);
    const [numberRecipe, setNumberRecipe] = useState<number>(0);

    const changeDay = (number: number) => {
        setDay(number);
        setNumberRecipe(number - todayDay);
    };

    return (
        <div className="mt-8">
            <Calendar day={day} setDay={changeDay} />
            <RecipeContainer
                username={username}
                recipe={recipes[numberRecipe]}
                favorites={favorites}
            />
        </div>
    );
};
