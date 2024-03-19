import { ObjectId } from "mongoose"

export type AddRecipeToUser = {
    recipes: ObjectId[];
}

export type AddOneRecipeToUser = {
    recipe: ObjectId;
}