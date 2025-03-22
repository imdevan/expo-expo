import React from 'react';
import { View, Text } from 'react-native';
import { render, renderHook, act } from '@testing-library/react-native';
import { AuthProvider } from '@/providers/AuthProvider';
import { useAuth } from '@/hooks/useAuth';
import { fakeAuth } from '@/services/fakeAuth';
import { mockUser } from '../setup';
import { waitForStateUpdate } from '__tests__/utils';

// Mock the fakeAuth service
jest.mock('@/services/fakeAuth', () => ({
  fakeAuth: {
    getCurrentUser: jest.fn(),
    signIn: jest.fn(),
    signUp: jest.fn(),
    signOut: jest.fn(),
  },
}));

const TestComponent = () => {
  const { user, isLoading } = useAuth();
  return (
    <View>
      <Text testID='loading'>{isLoading.toString()}</Text>
      <Text testID='user'>{user ? JSON.stringify(user) : 'null'}</Text>
    </View>
  );
};

// Helper function to wait for state updates
const wait = (ms: number = 0) => new Promise((resolve) => setTimeout(resolve, ms));

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fakeAuth.getCurrentUser as jest.Mock).mockResolvedValue({ user: null });
  });

  it('provides initial loading state', async () => {
    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitForStateUpdate();

    expect(getByTestId('loading')).toHaveTextContent('false');
    expect(getByTestId('user')).toHaveTextContent('null');
  });

  it('loads user on mount if authenticated', async () => {
    // Setup mock before rendering
    (fakeAuth.getCurrentUser as jest.Mock).mockResolvedValue({ user: mockUser });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for the initial mount
    await waitForStateUpdate();

    // Wait for the getCurrentUser call to resolve
    await waitForStateUpdate(100);

    // Get the actual text content and compare with expected
    const userElement = getByTestId('user');
    const actualContent = userElement.props.children;

    expect(getByTestId('loading')).toHaveTextContent('false');
    expect(fakeAuth.getCurrentUser).toHaveBeenCalled();
    expect(actualContent).toBe(JSON.stringify(mockUser));
  });

  it('handles sign in', async () => {
    const signInMock = jest.fn().mockResolvedValue({
      user: mockUser,
      error: null,
    });
    (fakeAuth.signIn as jest.Mock).mockImplementation(signInMock);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitForStateUpdate(100);

    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password',
      });
      await wait(100);
    });

    expect(signInMock).toHaveBeenCalled();
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  it('handles sign up successfully', async () => {
    const signUpMock = jest.fn().mockResolvedValue({
      user: mockUser,
      error: null,
    });
    (fakeAuth.signUp as jest.Mock).mockImplementation(signUpMock);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitForStateUpdate(100);

    await act(async () => {
      await result.current.signUp({
        email: 'test@example.com',
        password: 'password',
      });
      await wait(100);
    });

    expect(signUpMock).toHaveBeenCalled();
    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  it('handles sign out successfully', async () => {
    const signOutMock = jest.fn().mockResolvedValue(undefined);
    (fakeAuth.signOut as jest.Mock).mockImplementation(signOutMock);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitForStateUpdate(100);

    await act(async () => {
      await result.current.signOut();
      await wait(100);
    });

    expect(signOutMock).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('handles errors appropriately', async () => {
    const mockError = new Error('Test error');
    const signInMock = jest.fn().mockResolvedValue({
      user: null,
      error: mockError,
    });
    (fakeAuth.signIn as jest.Mock).mockImplementation(signInMock);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitForStateUpdate(100);

    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password',
      });
      await wait(100);
    });

    expect(signInMock).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });
});
