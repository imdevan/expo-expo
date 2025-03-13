import React from 'react';
import { render } from '@testing-library/react-native';
import LogoutScreen from '@/app/logout';
import { useAuth } from '@/hooks/useAuth';

// Mock the dependencies
jest.mock('@/hooks/useAuth');
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    auth: {
      signOut: jest.fn(),
    },
  })),
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
    expect(mockSignOut).toHaveBeenCalled();
  });

  it('renders nothing', () => {
    const { toJSON } = render(<LogoutScreen />);
    expect(toJSON()).toBeNull();
  });
}); 