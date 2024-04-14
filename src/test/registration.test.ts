import { signUp } from '@services/auth';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

jest.mock('firebase/auth');
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(() => ({})),
        createUserWithEmailAndPassword: jest.fn(),
    };
});

const mockAuth = getAuth();

beforeEach(() => {
    jest.clearAllMocks();
    (createUserWithEmailAndPassword as jest.Mock).mockReset();
    (fetch as jest.Mock).mockReset();
});

describe('signUp function', () => {
    it('should return true on successful registration', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const mockUser = {
            user: {
                getIdToken: jest.fn(() => Promise.resolve('fakeToken')),
            },
        };

        // Setup mocks
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUser);
        (fetch as jest.Mock).mockResolvedValue(
            new Response(JSON.stringify({ statusCode: 200 }), { status: 200 }),
        );

        const result = await signUp(email, password);
        expect(result).toBe(true);
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
        expect(fetch).toHaveBeenCalled();
    });

    it('should return false if Firebase authentication fails', async () => {
        const email = 'test@example.com';
        const password = 'password123';

        // Setup mock to simulate Firebase error
        (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(
            new Error('Firebase error'),
        );

        const result = await signUp(email, password);
        expect(result).toBe(false);
        expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
    });

    it('should return false if API response is not ok', async () => {
        const email = 'test@example.com';
        const password = 'password123';
        const mockUser = {
            user: {
                getIdToken: jest.fn(() => Promise.resolve('fakeToken')),
            },
        };

        // Setup mocks
        (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUser);
        (fetch as jest.Mock).mockResolvedValue(
            new Response(JSON.stringify({ statusCode: 400 }), { status: 400 }),
        );

        const result = await signUp(email, password);
        expect(result).toBe(false);
        expect(fetch).toHaveBeenCalled();
    });
});
