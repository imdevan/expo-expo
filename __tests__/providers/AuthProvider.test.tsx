import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { AuthProvider } from '@/providers/AuthProvider';
import { useAuth } from '@/hooks/useAuth';
import { mockSupabaseAuth, mockUser, mockRouter } from '../setup';

describe('AuthProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with loading state', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for the initial state to be set
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // After the async operation completes, loading should be false
    expect(result.current.isLoading).toBe(false);
  });

  it('loads user on mount', async () => {
    mockSupabaseAuth.getCurrentUser.mockResolvedValue({
      user: mockUser,
      error: null,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for the async state update to complete
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.user).toEqual(mockUser);
  });

  it('handles sign in successfully', async () => {
    mockSupabaseAuth.signIn.mockResolvedValue({
      user: mockUser,
      error: null,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for initial state to be set
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  it('handles sign up successfully', async () => {
    mockSupabaseAuth.signUp.mockResolvedValue({
      user: mockUser,
      error: null,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for initial state to be set
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.signUp({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.error).toBeNull();
  });

  it('handles sign out successfully', async () => {
    mockSupabaseAuth.signOut.mockResolvedValue(undefined);

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for initial state to be set
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.signOut();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('handles reset password successfully', async () => {
    mockSupabaseAuth.resetPassword.mockResolvedValue({
      error: null,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for initial state to be set
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.resetPassword('test@example.com');
    });

    expect(result.current.error).toBeNull();
  });

  it('handles errors appropriately', async () => {
    const mockError = new Error('Test error');
    mockSupabaseAuth.signIn.mockResolvedValue({
      user: null,
      error: mockError,
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    // Wait for initial state to be set
    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    await act(async () => {
      await result.current.signIn({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(result.current.user).toBeNull();
    expect(result.current.error).toEqual(mockError);
  });
}); 