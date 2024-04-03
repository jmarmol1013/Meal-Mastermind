import { Recipes } from '@models/recipes';
import { Users } from '@models/users';
import { APIResponse } from '@typesApp/api';
import { User } from '@typesApp/user';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { username: string } }) {
    try {
        const session = req.headers.get('session');
        const isAuth = await isUserAuthenticated(session!);

        if (!isAuth) {
            return NextResponse.json<APIResponse<void>>(
                {
                    statusCode: 401,
                    message: 'Must be authenticated.',
                },
                {
                    status: 401,
                },
            );
        }

        await connectMongo();
        const username = params.username;

        if (!username) {
            return NextResponse.json<APIResponse<void>>(
                {
                    statusCode: 400,
                    message: 'The request body is missing required fields.',
                },
                {
                    status: 400,
                },
            );
        }

        const user: User | null = await Users.findOne({ username: username });
        const recipesTitlesJson = await Recipes.find(
            { _id: { $in: user?.favorites } },
            { _id: 0, title: 1 },
        );
        const recipesTitles: String[] = recipesTitlesJson.map((recipe) => recipe.title);

        if (!user) {
            return NextResponse.json<APIResponse<void>>(
                {
                    statusCode: 404,
                    message: 'Error getting recipes from the user.',
                },
                {
                    status: 404,
                },
            );
        }

        //Call AI API to get recipes
        const fetchNewRecipes = await fetch(`${process.env.NEXT_PUBLIC_API_GET_SUGGEST_RECIPES!}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: user.type,
                favorite_recipes: recipesTitles,
                allergens: user.allergies,
            }),
        });

        const resBody = await fetchNewRecipes.json();
        const newRecipesTitle: String[] = resBody.recipes;

        if (!newRecipesTitle) {
            return NextResponse.json<APIResponse<void>>(
                {
                    statusCode: 404,
                    message: 'Error getting recipes from the model.',
                },
                {
                    status: 404,
                },
            );
        }

        const newRecipes = await Recipes.find({ title: { $in: newRecipesTitle } });
        const updateUser = await Users.findOneAndUpdate(
            { username: username },
            { $set: { recipes: newRecipes } },
            { new: true },
        );

        return NextResponse.json<APIResponse<User>>({
            statusCode: 200,
            message: 'User recipes update sucessfully.',
            data: updateUser,
        });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
