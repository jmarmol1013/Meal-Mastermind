import { signIn } from '@services/auth';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');
jest.mock('node-fetch', () => require('fetch-mock-jest').sandbox());

jest.mock('firebase/auth', () => {
    return {
        getAuth: jest.fn(() => ({})),
        signInWithEmailAndPassword: jest.fn(),
    };
});

const mockAuth = getAuth();

beforeEach(() => {
    jest.clearAllMocks();
    (signInWithEmailAndPassword as jest.Mock).mockReset();
    (fetch as jest.Mock).mockReset();
});

describe('signIn function', () => {
    it('should return true on successful login', async () => {
        const email = 'user@example.com';
        const password = 'securepassword';
        const mockUser = {
            user: {
                getIdToken: jest.fn(() => Promise.resolve('validToken')),
            },
        };

        // Setup mocks
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUser);
        (fetch as jest.Mock).mockResolvedValue(
            new Response(JSON.stringify({ statusCode: 200 }), { status: 200 }),
        );

        const result = await signIn(email, password);
        expect(result).toBe(true);
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
        expect(fetch).toHaveBeenCalled();
    });

    it('should return false if Firebase authentication fails', async () => {
        const email = 'user@example.com';
        const password = 'securepassword';

        // Setup mock to simulate Firebase error
        (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(
            new Error('Authentication error'),
        );

        const result = await signIn(email, password);
        expect(result).toBe(false);
        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockAuth, email, password);
    });

    it('should return false if API response is not ok', async () => {
        const email = 'user@example.com';
        const password = 'securepassword';
        const mockUser = {
            user: {
                getIdToken: jest.fn(() => Promise.resolve('validToken')),
            },
        };

        // Setup mocks
        (signInWithEmailAndPassword as jest.Mock).mockResolvedValue(mockUser);
        (fetch as jest.Mock).mockResolvedValue(
            new Response(JSON.stringify({ statusCode: 400 }), { status: 400 }),
        );

        const result = await signIn(email, password);
        expect(result).toBe(false);
        expect(fetch).toHaveBeenCalled();
    });
});
