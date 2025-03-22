import React from 'react';
import { View, Text } from 'react-native';
import { render, renderHook, act, waitFor } from '@testing-library/react-native';
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
  const { user, isLoading, error, signIn, signUp, signOut } = useAuth();
  return (
    <View>
      <Text testID='loading'>{isLoading.toString()}</Text>
      <Text testID='user'>{user ? JSON.stringify(user) : 'null'}</Text>
      <Text testID='error'>{error ? error.message : 'null'}</Text>
      <Text
        testID='signIn'
        onPress={() => signIn({ email: 'test@example.com', password: 'password' })}>
        Sign In
      </Text>
      <Text
        testID='signUp'
        onPress={() => signUp({ email: 'test@example.com', password: 'password' })}>
        Sign Up
      </Text>
      <Text testID='signOut' onPress={() => signOut()}>
        Sign Out
      </Text>
    </View>
  );
};

// Helper function to wait for state updates
const wait = (ms: number = 0) => new Promise((resolve) => setTimeout(resolve, ms));

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (fakeAuth.getCurrentUser as jest.Mock).mockResolvedValue({ user: null, error: null });
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
    (fakeAuth.getCurrentUser as jest.Mock).mockResolvedValue({ user: mockUser, error: null });

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

  it('handles error in checkUser', async () => {
    const mockError = new Error('Check user error');
    (fakeAuth.getCurrentUser as jest.Mock).mockResolvedValue({ user: null, error: mockError });

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitForStateUpdate(100);

    expect(getByTestId('loading')).toHaveTextContent('false');
    expect(getByTestId('user')).toHaveTextContent('null');
    expect(getByTestId('error')).toHaveTextContent('Check user error');
  });

  it('handles thrown error in checkUser', async () => {
    const mockError = new Error('Thrown error');
    (fakeAuth.getCurrentUser as jest.Mock).mockRejectedValue(mockError);

    const { getByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitForStateUpdate(100);

    expect(getByTestId('loading')).toHaveTextContent('false');
    expect(getByTestId('user')).toHaveTextContent('null');
    expect(getByTestId('error')).toHaveTextContent('Thrown error');
  });

  it('shows loading state during sign in', async () => {
    const signInMock = jest.fn().mockImplementation(async () => {
      await wait(100);
      return { user: mockUser, error: null };
    });
    (fakeAuth.signIn as jest.Mock).mockImplementation(signInMock);

    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitForStateUpdate(100);

    await act(async () => {
      getByTestId('signIn').props.onPress();
    });

    // Check that component is not rendered during loading
    await waitFor(() => {
      expect(queryByTestId('user')).toBeNull();
    });

    // Wait for the sign in to complete
    await wait(100);

    // Check that component is rendered and user is set
    await waitFor(() => {
      expect(queryByTestId('user')).not.toBeNull();
      expect(getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
    });
  });

  it('shows loading state during sign up', async () => {
    const signUpMock = jest.fn().mockImplementation(async () => {
      await wait(100);
      return { user: mockUser, error: null };
    });
    (fakeAuth.signUp as jest.Mock).mockImplementation(signUpMock);

    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitForStateUpdate(100);

    await act(async () => {
      getByTestId('signUp').props.onPress();
    });

    // Check that component is not rendered during loading
    await waitFor(() => {
      expect(queryByTestId('user')).toBeNull();
    });

    // Wait for the sign up to complete
    await wait(100);

    // Check that component is rendered and user is set
    await waitFor(() => {
      expect(queryByTestId('user')).not.toBeNull();
      expect(getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
    });
  });

  it('shows loading state during sign out', async () => {
    const signOutMock = jest.fn().mockImplementation(async () => {
      await wait(100);
    });
    (fakeAuth.signOut as jest.Mock).mockImplementation(signOutMock);

    const { getByTestId, queryByTestId } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitForStateUpdate(100);

    await act(async () => {
      getByTestId('signOut').props.onPress();
    });

    // Check that component is not rendered during loading
    await waitFor(() => {
      expect(queryByTestId('user')).toBeNull();
    });

    // Wait for the sign out to complete
    await wait(100);

    // Check that component is rendered and user is null
    await waitFor(() => {
      expect(queryByTestId('user')).not.toBeNull();
      expect(getByTestId('user')).toHaveTextContent('null');
    });
  });
});
