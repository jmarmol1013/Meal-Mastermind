import { Recipes } from '@models/recipes';
import { APIResponse } from '@typesApp/api';
import { Recipe } from '@typesApp/recipes';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const isAuth = await isUserAuthenticated();

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
        const id = params.id;
        const updateFields: Recipe = await req.json();

        if (updateFields.title) {
            const updateRecipe = await Recipes.findByIdAndUpdate(
                id,
                { $set: { ...updateFields } },
                { new: true },
            );

            if (!updateRecipe) {
                return NextResponse.json<APIResponse<void>>(
                    {
                        statusCode: 404,
                        message: 'Recipe not found.',
                    },
                    {
                        status: 404,
                    },
                );
            }

            return NextResponse.json<APIResponse<Recipe>>({
                statusCode: 200,
                message: 'Recipe update sucessfully.',
                data: updateRecipe,
            });
        }

        return NextResponse.json<APIResponse<void>>(
            {
                statusCode: 400,
                message: 'The request body is missing required fields.',
            },
            {
                status: 400,
            },
        );
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 400 });
    }
}
