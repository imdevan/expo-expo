import '@testing-library/jest-native/extend-expect';

// Mock environment variables
process.env.EXPO_PUBLIC_SUPABASE_URL = 'https://test.supabase.co';
process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY = 'test-anon-key';

// Mock Supabase client first
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      getUser: jest.fn(),
      signUp: jest.fn(),
      signInWithPassword: jest.fn(),
      signOut: jest.fn(),
      resetPasswordForEmail: jest.fn(),
    },
  })),
}));

// Mock our Supabase service
jest.mock('@/services/supabase', () => ({
  supabaseAuth: {
    getCurrentUser: jest.fn(),
    signUp: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
  },
}));

// Mock expo-router
jest.mock('expo-router', () => {
  const mockRouter = {
    replace: jest.fn(),
  };
  const mockUseSegments = jest.fn();
  const mockUseRouter = jest.fn(() => mockRouter);

  return {
    router: mockRouter,
    useSegments: mockUseSegments,
    useRouter: mockUseRouter,
  };
});

// Mock expo modules that might cause issues in tests
jest.mock('expo-constants', () => ({
  Constants: {
    manifest: {
      extra: {
        apiUrl: 'http://localhost:3000',
      },
    },
  },
}));

// Mock react-i18next
jest.mock('react-i18next');

// Add other Jest setup configurations here 