import { Recipe } from '@typesApp/recipes';
import { Schema, model, models } from 'mongoose';

const RecipesSchema = new Schema<Recipe>(
    {
        title: {
            type: String,
            required: [true, 'Please enter title'],
            unique: true,
        },
        keywords: [
            {
                type: String,
                required: [true, 'Please enter keywords'],
            },
        ],
        cuisine: {
            type: String,
            required: [true, 'Please enter cuisine'],
        },
        description: {
            type: String,
            required: [true, 'Please enter description'],
        },
        type: {
            type: String,
            enum: ['Normal', 'Loss-weight', 'Gain-weight', 'Vegan', 'Family'],
        },
        ingredients: [
            {
                type: {
                    name: {
                        type: String,
                        required: [true, 'Insert ingredient name'],
                    },
                    quantity: {
                        type: Number,
                        required: [true, 'Insert ingredient quantity'],
                    },
                    measure: {
                        type: String,
                        required: [true, 'Insert ingredient meassure'],
                    },
                },
                required: [true, 'Please insert the ingredients'],
            },
        ],
        steps: [
            {
                type: String,
                required: [true, 'Please insert steps'],
            },
        ],
        nutritionalInfo: [
            {
                type: {
                    calories: {
                        type: Number,
                        required: [true, 'Insert ingredient calories'],
                    },
                    protein: {
                        type: Number,
                        required: [true, 'Insert ingredient protein'],
                    },
                    fats: {
                        type: Number,
                        required: [true, 'Insert ingredient fats'],
                    },
                    carbohydrate: {
                        type: Number,
                        required: [true, 'Insert ingredient carbohydrate'],
                    },
                    sodium: {
                        type: Number,
                        required: [true, 'Insert ingredient sodium'],
                    },
                },
                required: [true, 'Please insert nutritional info'],
            },
        ],
        allergies: [
            {
                type: String,
                enum: [
                    'Peanuts',
                    'Tree nuts (such as almonds, cashews, walnuts)',
                    'Shellfish (such as shrimp, crab, lobster)',
                    'Fish',
                    'Milk',
                    'Eggs',
                    'Wheat',
                    'Soy',
                    'Sesame',
                    'Sulfites',
                ],
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
        },
    },
);

export const Recipes = models.Recipes || model('Recipes', RecipesSchema);
