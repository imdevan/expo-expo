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

export const fakeAuth = {
  signUp: async (credentials: AuthCredentials): Promise<AuthResponse> => {
    try {
      // Validate credentials
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(credentials.email)) {
        throw new Error('Invalid email format');
      }

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
        user: newUser,
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
            user,
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
      if (currentUser === undefined) {
        throw new Error('Invalid user state');
      }
      return {
        user: currentUser,
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
