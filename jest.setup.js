import '@testing-library/jest-native/extend-expect';

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

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
