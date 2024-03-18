import { ObjectId } from "mongoose"

export type AddRecipeToUser = {
    recipes: ObjectId[];
}