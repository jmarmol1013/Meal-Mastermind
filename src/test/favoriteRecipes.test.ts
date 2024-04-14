import { addFavoriteRecipe, deleteFavoriteRecipe } from '@services/profile';
import fetchMock from 'jest-fetch-mock';
import { ObjectId } from 'mongoose';

jest.mock('node-fetch', () => require('jest-fetch-mock'));
fetchMock.enableMocks();

jest.mock('@utils/firebase/firebase-admin', () => ({
    isUserAuthenticated: jest.fn(),
}));

beforeEach(() => {
    fetchMock.resetMocks();
    jest.clearAllMocks();
});

describe('Add favorite recipe to user', () => {
    const username = 'testuser';
    const recipeId = '507f191e810c19729de860ea' as unknown as ObjectId;

    beforeEach(() => {
        (fetch as jest.Mock).mockReset();
        jest.clearAllMocks();
    });

    it('successfully adds a recipe to favorites', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ statusCode: 200 }), { status: 200 });
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(true);

        const result = await addFavoriteRecipe(username, recipeId);
        expect(result).toBe(true);
        expect(fetchMock).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_ADD_FAV_RECIPE}/${username}`,
            expect.objectContaining({
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    favorites: recipeId,
                }),
            }),
        );
    });

    it('returns false when user is not authenticated', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({ statusCode: 401, message: 'Must be authenticated.' }),
            { status: 401 },
        );
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(false);

        const result = await addFavoriteRecipe(username, recipeId);
        expect(result).toBe(false);
    });

    it('returns false when user is not found', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({ statusCode: 404, message: 'User not found.' }),
            { status: 404 },
        );
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(true);

        const result = await addFavoriteRecipe(username, recipeId);
        expect(result).toBe(false);
    });
});

describe('Delete favorite recipe to user', () => {
    const username = 'testuser';
    const recipeId = '507f191e810c19729de860ea' as unknown as ObjectId;

    beforeEach(() => {
        (fetch as jest.Mock).mockReset();
        jest.clearAllMocks();
    });

    it('successfully adds a recipe to favorites', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ statusCode: 200 }), { status: 200 });
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(true);

        const result = await deleteFavoriteRecipe(username, recipeId);
        expect(result).toBe(true);
        expect(fetchMock).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_ADD_FAV_RECIPE}/${username}`,
            expect.objectContaining({
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    favorites: recipeId,
                }),
            }),
        );
    });

    it('returns false when user is not authenticated', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({ statusCode: 401, message: 'Must be authenticated.' }),
            { status: 401 },
        );
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(false);

        const result = await deleteFavoriteRecipe(username, recipeId);
        expect(result).toBe(false);
    });

    it('returns false when user is not found', async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({ statusCode: 404, message: 'User not found.' }),
            { status: 404 },
        );
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(true);

        const result = await deleteFavoriteRecipe(username, recipeId);
        expect(result).toBe(false);
    });
});
