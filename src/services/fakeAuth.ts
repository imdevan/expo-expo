import { AuthCredentials, AuthResponse, User } from '@/types/auth';

// In-memory storage for users
const users: User[] = [
  {
    id: '1',
    email: 'test@email.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// In-memory storage for sessions
let currentUser: User | null = null;

// Helper to transform user to our User type
const transformUser = (user: User | null): User | null => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const fakeAuth = {
  signUp: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    try {
      // Check if user already exists
      const existingUser = users.find((user) => user.email === credentials.email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser: User = {
        id: String(users.length + 1),
        email: credentials.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      users.push(newUser);
      currentUser = newUser;

      return {
        user: transformUser(newUser),
        error: null,
      };
    } catch (error) {
      return {
        user: null,
        error: error as Error,
      };
    }
  },

  signIn: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    try {
      // Check for test user
      if (credentials.email === 'test@email.com' && credentials.password === 'password') {
        const user = users.find((u) => u.email === credentials.email);
        if (user) {
          currentUser = user;
          return {
            user: transformUser(user),
            error: null,
          };
        }
      }

      throw new Error('Invalid credentials');
    } catch (error) {
      return {
        user: null,
        error: error as Error,
      };
    }
  },

  signOut: async (): Promise<void> => {
    currentUser = null;
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    try {
      return {
        user: transformUser(currentUser),
        error: null,
      };
    } catch (error) {
      return {
        user: null,
        error: error as Error,
      };
    }
  },
};
