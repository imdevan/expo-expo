import { fakeAuth } from '@/services/fakeAuth';
import { AuthCredentials } from '@/types/auth';

describe('fakeAuth', () => {
  beforeEach(() => {
    // Reset the in-memory state before each test
    fakeAuth.signOut();
  });

  describe('signUp', () => {
    it('creates a new user with valid credentials', async () => {
      const credentials: AuthCredentials = {
        email: 'new@email.com',
        password: 'password123',
      };

      const response = await fakeAuth.signUp(credentials);

      expect(response.error).toBeNull();
      expect(response.user).not.toBeNull();
      expect(response.user?.email).toBe(credentials.email);
      expect(response.user?.id).toBeDefined();
      expect(response.user?.createdAt).toBeDefined();
      expect(response.user?.updatedAt).toBeDefined();
    });

    it('returns error when user already exists', async () => {
      const credentials: AuthCredentials = {
        email: 'test@email.com', // This email exists in the initial users array
        password: 'password123',
      };

      const response = await fakeAuth.signUp(credentials);

      expect(response.user).toBeNull();
      expect(response.error).not.toBeNull();
      expect(response.error?.message).toBe('User already exists');
    });

    it('handles empty credentials', async () => {
      const credentials: AuthCredentials = {
        email: '',
        password: '',
      };

      const response = await fakeAuth.signUp(credentials);

      expect(response.user).toBeNull();
      expect(response.error).not.toBeNull();
    });

    it('handles invalid email format', async () => {
      const credentials: AuthCredentials = {
        email: 'invalid-email',
        password: 'password123',
      };

      const response = await fakeAuth.signUp(credentials);

      expect(response.user).toBeNull();
      expect(response.error).not.toBeNull();
    });
  });

  describe('signIn', () => {
    it('signs in with valid credentials', async () => {
      const credentials: AuthCredentials = {
        email: 'test@email.com',
        password: 'password',
      };

      const response = await fakeAuth.signIn(credentials);

      expect(response.error).toBeNull();
      expect(response.user).not.toBeNull();
      expect(response.user?.email).toBe(credentials.email);
    });

    it('returns error with invalid credentials', async () => {
      const credentials: AuthCredentials = {
        email: 'test@email.com',
        password: 'wrongpassword',
      };

      const response = await fakeAuth.signIn(credentials);

      expect(response.user).toBeNull();
      expect(response.error).not.toBeNull();
      expect(response.error?.message).toBe('Invalid credentials');
    });

    it('returns error with non-existent email', async () => {
      const credentials: AuthCredentials = {
        email: 'nonexistent@email.com',
        password: 'password',
      };

      const response = await fakeAuth.signIn(credentials);

      expect(response.user).toBeNull();
      expect(response.error).not.toBeNull();
      expect(response.error?.message).toBe('Invalid credentials');
    });
  });

  describe('signOut', () => {
    it('signs out the current user', async () => {
      // First sign in
      await fakeAuth.signIn({
        email: 'test@email.com',
        password: 'password',
      });

      // Then sign out
      await fakeAuth.signOut();

      // Check that user is signed out
      const response = await fakeAuth.getCurrentUser();
      expect(response.user).toBeNull();
      expect(response.error).toBeNull();
    });

    it('handles sign out when no user is signed in', async () => {
      await fakeAuth.signOut();
      const response = await fakeAuth.getCurrentUser();
      expect(response.user).toBeNull();
      expect(response.error).toBeNull();
    });
  });

  describe('getCurrentUser', () => {
    it('returns current user when signed in', async () => {
      // First sign in
      await fakeAuth.signIn({
        email: 'test@email.com',
        password: 'password',
      });

      const response = await fakeAuth.getCurrentUser();

      expect(response.error).toBeNull();
      expect(response.user).not.toBeNull();
      expect(response.user?.email).toBe('test@email.com');
    });

    it('returns null when no user is signed in', async () => {
      const response = await fakeAuth.getCurrentUser();

      expect(response.user).toBeNull();
      expect(response.error).toBeNull();
    });

    it('handles error state gracefully', async () => {
      // Mock getCurrentUser to simulate an error
      jest.spyOn(fakeAuth, 'getCurrentUser').mockImplementationOnce(async () => ({
        user: null,
        error: new Error('Internal error'),
      }));

      const response = await fakeAuth.getCurrentUser();

      expect(response.user).toBeNull();
      expect(response.error).not.toBeNull();
      expect(response.error?.message).toBe('Internal error');
    });

    it('handles network errors gracefully', async () => {
      // Mock getCurrentUser to simulate a network error
      jest.spyOn(fakeAuth, 'getCurrentUser').mockImplementationOnce(async () => ({
        user: null,
        error: new Error('Network error'),
      }));

      const response = await fakeAuth.getCurrentUser();

      expect(response.user).toBeNull();
      expect(response.error).not.toBeNull();
      expect(response.error?.message).toBe('Network error');
    });
  });
});
