import { Recipes } from '@models/recipes';
import { APIResponse } from '@typesApp/api';
import { Recipe } from '@typesApp/recipes';
import { isUserAuthenticated } from '@utils/firebase/firebase-admin';
import { connectMongo } from '@utils/mongo-connection';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
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
        const body: Recipe = await req.json();

        if (body.title) {
            const recipe: Recipe = await Recipes.create(body);

            return NextResponse.json<APIResponse<Recipe>>({
                statusCode: 200,
                message: 'Recipe save sucessfully.',
                data: recipe,
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
