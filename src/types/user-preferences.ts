import { Allergie, Cuisine, UserType } from './user';
import { Recipe } from './recipes';

export type UserPreferences = {
    type: UserType;
    cuisines: Cuisine[];
    allergies?: Allergie[];
    favorites: Recipe['_id'][];
};
