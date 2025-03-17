import React from 'react';
import { render } from '@testing-library/react-native';
import LogoutScreen from '@/app/logout';
import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';

// Mock the dependencies
jest.mock('@/hooks/useAuth');
jest.mock('expo-router', () => ({
  Redirect: jest.fn(() => null),
}));

describe('LogoutScreen', () => {
  const mockSignOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signOut: mockSignOut,
    });
  });

  it('calls signOut when mounted', () => {
    render(<LogoutScreen />);
    expect(mockSignOut).toHaveBeenCalledTimes(1);
  });

  it('renders Redirect component with correct props', () => {
    render(<LogoutScreen />);
    expect(Redirect).toHaveBeenCalledWith(
      expect.objectContaining({
        href: '/auth',
      }),
      expect.any(Object)
    );
  });
});
