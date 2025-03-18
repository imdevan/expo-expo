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

  it('redirects to auth when unauthenticated user tries to access protected route', async () => {
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

    // Wait for the navigation to occur after the initial render and timeout
    await waitFor(
      () => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/auth');
      },
      { timeout: 150 } // Slightly longer than the component's timeout
    );
  });

  it('redirects to tabs when authenticated user tries to access auth', async () => {
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

    // Wait for the navigation to occur after the initial render and timeout
    await waitFor(
      () => {
        expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
      },
      { timeout: 150 } // Slightly longer than the component's timeout
    );
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

    // Wait for the initial render and timeout to complete
    await waitFor(
      () => {
        expect(getByText('Protected Content')).toBeTruthy();
        expect(mockRouter.replace).not.toHaveBeenCalled();
      },
      { timeout: 150 }
    );
  });

  it('renders children when unauthenticated user accesses auth route', async () => {
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

    // Wait for the initial render and timeout to complete
    await waitFor(
      () => {
        expect(getByText('Auth Content')).toBeTruthy();
        expect(mockRouter.replace).not.toHaveBeenCalled();
      },
      { timeout: 150 }
    );
  });

  it('does not redirect while loading', async () => {
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

    // Wait for the initial render and timeout to complete
    await waitFor(
      () => {
        expect(mockRouter.replace).not.toHaveBeenCalled();
      },
      { timeout: 150 }
    );
  });
});
