import { ObjectId } from 'mongoose';
import { Allergie, Cuisine, UserType } from './user';

export type UserPreferences = {
    type: UserType;
    cuisines: Cuisine[];
    allergies?: Allergie[];
    favorities: ObjectId[];
};
