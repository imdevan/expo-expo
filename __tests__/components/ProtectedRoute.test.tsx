import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '@/hooks/useAuth';
import { mockUser, mockRouter, mockUseSegments } from '../setup';

// Mock the dependencies
jest.mock('@/hooks/useAuth');

describe('ProtectedRoute', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('redirects to auth when unauthenticated user tries to access protected route', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
    });
    mockUseSegments.mockReturnValue(['(tabs)']);

    render(
      <ProtectedRoute>
        <Text>Protected Content</Text>
      </ProtectedRoute>
    );

    expect(mockRouter.replace).toHaveBeenCalledWith('/auth');
  });

  it('redirects to tabs when authenticated user tries to access auth', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });
    mockUseSegments.mockReturnValue(['auth']);

    render(
      <ProtectedRoute>
        <Text>Protected Content</Text>
      </ProtectedRoute>
    );

    expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
  });

  it('renders children when authenticated user accesses protected route', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: mockUser,
      isLoading: false,
    });
    mockUseSegments.mockReturnValue(['(tabs)']);

    const { getByText } = render(
      <ProtectedRoute>
        <Text>Protected Content</Text>
      </ProtectedRoute>
    );

    // Add a small delay to allow useEffect to complete
    await new Promise(resolve => setTimeout(resolve, 0));

    await waitFor(() => {
      expect(getByText('Protected Content')).toBeTruthy();
      expect(mockRouter.replace).not.toHaveBeenCalled();
    });
  });

  it('renders children when unauthenticated user accesses auth route', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: false,
    });
    mockUseSegments.mockReturnValue(['auth']);

    const { getByText } = render(
      <ProtectedRoute>
        <Text>Auth Content</Text>
      </ProtectedRoute>
    );

    expect(getByText('Auth Content')).toBeTruthy();
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });

  it('does not redirect while loading', () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: null,
      isLoading: true,
    });
    mockUseSegments.mockReturnValue(['(tabs)']);

    render(
      <ProtectedRoute>
        <Text>Protected Content</Text>
      </ProtectedRoute>
    );

    expect(mockRouter.replace).not.toHaveBeenCalled();
  });
}); 