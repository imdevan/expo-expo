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

// Now we can safely import and export our mocks
import { supabaseAuth } from '@/services/supabase';
import { router, useSegments, useRouter } from 'expo-router';

// Export mocks for use in tests
export const mockSupabaseAuth = supabaseAuth as jest.Mocked<typeof supabaseAuth>;
export const mockRouter = router as jest.Mocked<typeof router>;
export const mockUseSegments = useSegments as jest.MockedFunction<typeof useSegments>;
export const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;

// Mock user for testing
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
};
