import { User } from '@typesApp/user';
import mongoose, { Schema, model, models } from 'mongoose';
import isEmail from 'validator/lib/isEmail';

const UsersSchema = new Schema<User>(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter first name'],
        },
        lastName: {
            type: String,
            required: [true, 'Please enter last name'],
        },
        email: {
            type: String,
            required: [true, 'Please enter email'],
            lowercase: true,
            validate: [isEmail, 'Please enter a valid email'],
        },
        username: {
            type: String,
            unique: true,
            required: [true, 'Please enter username'],
        },
        isRegister: {
            type: Boolean,
            required: [true, 'Please insert if the user is register'],
        },
        type: {
            type: String,
            enum: ['Normal', 'Loss-weight', 'Gain-weight', 'Vegan', 'Family'],
        },
        cuisines: [
            {
                type: String,
                enum: [
                    'Italian',
                    'Mexican',
                    'Chinese',
                    'Indian',
                    'Japanese',
                    'Thai',
                    'Mediterranean',
                    'French',
                    'Greek',
                ],
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
        recipes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes',
            },
        ],
        favorites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'recipes',
            },
        ],
    },
    {
        timestamps: true,
        toJSON: {
            versionKey: false,
            virtuals: true,
            transform: (_, ret) => {
                delete ret._id;
            },
        },
    },
);

export const Users = models.Users || model('Users', UsersSchema);
