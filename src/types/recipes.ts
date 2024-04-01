import { ObjectId } from 'mongoose';
import { Allergie } from './user';

export type Recipe = {
    _id: ObjectId;
    title: string;
    keywords: string[];
    cuisine: string;
    description: string;
    type: string;
    ingredients: Ingredient[];
    steps: string[];
    nutritionalInfo: NutritionalInfo;
    allergies?: Allergie[];
};

export type Ingredient = {
    name: string;
    quantity: number;
    measure: string;
};

export type NutritionalInfo = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrate: number;
    sodium: number;
};
