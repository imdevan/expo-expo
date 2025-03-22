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
// import { fakeAuth } from '@/services/fakeAuth';
import { router, useSegments, useRouter } from 'expo-router';

// Export mocks for use in tests
// export const mockFakeAuth = fakeAuth as jest.Mocked<typeof fakeAuth>;
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
