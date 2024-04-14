import { updatePreferences } from '@services/userPreferences';
import { Allergie, Cuisine, User } from '@typesApp/user';
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

describe('Update preferences for user', () => {
    const username = 'testUser';
    const type = 'Normal';
    const cuisines: Cuisine[] = ['Italian', 'Mexican'];
    const favorites: User['favorites'] = [
        '507f191e810c19729de860ea',
        '507f191e810c19729de860eb',
    ] as unknown as ObjectId[];
    const allergies: Allergie[] = [];

    it('should return true when preferences are successfully updated', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ statusCode: 200 }), { status: 200 });
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(true);

        const result = await updatePreferences(username, type, cuisines, favorites, allergies);
        expect(result).toBe(false);
        expect(fetchMock).toHaveBeenCalledWith(
            `${process.env.NEXT_PUBLIC_API_UPDATE_USER_PREFERENCES!}/${username}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, cuisines, favorites, allergies }),
            },
        );
    });

    it('should return false if the user is not authenticated', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ statusCode: 401 }), { status: 401 });
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(false);

        const result = await updatePreferences(username, type, cuisines, favorites, allergies);
        expect(result).toBe(false);
    });

    it('should return false if the user is not found', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ statusCode: 404 }), { status: 404 });
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(true);

        const result = await updatePreferences(username, type, cuisines, favorites, allergies);
        expect(result).toBe(false);
    });

    it('should return false if the request is missing required fields', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ statusCode: 400 }), { status: 400 });
        const isAuthMock = require('@utils/firebase/firebase-admin').isUserAuthenticated;
        isAuthMock.mockResolvedValue(true);

        const result = await updatePreferences(username, undefined, [], [], allergies);
        expect(result).toBe(false);
    });
});
