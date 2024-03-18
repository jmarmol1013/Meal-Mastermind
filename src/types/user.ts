import { ObjectId } from 'mongoose';

export type User = {
    _id?: ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    isRegister: boolean;
    type?: UserType;
    cuisines?: Cuisine[];
    allergies?: Allergie[];
    recipes?: ObjectId[];
    favorites?: ObjectId[];
};

export type Allergie =
    | 'Peanuts'
    | 'Tree nuts (such as almonds, cashews, walnuts)'
    | 'Shellfish (such as shrimp, crab, lobster)'
    | 'Fish'
    | 'Milk'
    | 'Eggs'
    | 'Wheat'
    | 'Soy'
    | 'Sesame'
    | 'Sulfites';

export type Cuisine =
    | 'Italian'
    | 'Mexican'
    | 'Chinese'
    | 'Indian'
    | 'Japanese'
    | 'Thai'
    | 'Mediterranean'
    | 'French'
    | 'Greek';

export type UserType = 'Normal' | 'Loss-weight' | 'Gain-weight' | 'Vegan' | 'Family';
