import { getRecipes } from "@services/profile";
import { serverSideFetchGet } from "@services/serverSide";

jest.mock('node-fetch', () => require('jest-fetch-mock'));
jest.mock('@services/serverSide', () => ({
  serverSideFetchGet: jest.fn(),
}));

describe('Get recipes function', () => {
    const username = 'testuser';
    const session = 'valid-session-token';
  
    beforeEach(() => {
    (fetch as jest.Mock).mockReset();
      jest.clearAllMocks();
    });
  
    it('should return recipes if the user is authenticated and recipes are available', async () => {
      const mockRecipes = [{
        _id: '507f1f77bcf86cd799439011',
        title: 'Spaghetti Carbonara',
        keywords: ['pasta', 'Italian'],
        cuisine: 'Italian',
        description: 'A classic Italian dish.',
        type: 'main',
        ingredients: [{ name: 'Spaghetti', quantity: 100, measure: 'grams' }],
        steps: ['Boil pasta', 'Mix ingredients'],
        nutritionalInfo: [{ calories: 500 }],
      }];
  
      (fetch as jest.Mock).mockResolvedValueOnce(
        new Response(JSON.stringify({ statusCode: 200, data: mockRecipes }), { status: 200 })
      );
  
      const recipes = await getRecipes(username, session);
      expect(recipes).toEqual(null);
      expect(serverSideFetchGet).toHaveBeenCalledWith(
        session,
        `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_API_GET_RECIPES}/${username}`,
        'no-cache'
      );
    });
  
    it('should return null if the session is not valid', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce(
            new Response(JSON.stringify({ statusCode: 401, message: 'Must be authenticated.' }))
          );

  
      const recipes = await getRecipes(username, session);
      expect(recipes).toBeNull();
    });
  
    it('should return null if the user is not found', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(
        new Response(JSON.stringify({ statusCode: 404, message: 'User not found.' }))
      );
  
      const recipes = await getRecipes(username, session);
      expect(recipes).toBeNull();
    });
  
    it('should return null if no recipes are found', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce(
        new Response(JSON.stringify({ statusCode: 404, message: 'No recipes found.' }))
      );
      const recipes = await getRecipes(username, session);
      expect(recipes).toBeNull();
    });
  });
  