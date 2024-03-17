import { ObjectId } from 'mongoose';
import { Allergie } from './user';

export type Recipe = {
    id: ObjectId;
    title: string;
    keywords: string[];
    cuisine: string;
    description: string;
    type: string;
    ingredients: Ingredient[];
    steps: string[];
    nutritionalInfo: nutritionalInfo;
    allergies?: Allergie[];
};

export type Ingredient = {
    name: string;
    quantity: number;
    meassure: string;
};

export type nutritionalInfo = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrate: number;
    sodium: number;
};
