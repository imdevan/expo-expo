import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from '@/hooks/useAuth';
import { AuthContext } from '@/providers/AuthProvider';

describe('useAuth', () => {
  it('returns auth context when used within AuthProvider', () => {
    const mockContext = {
      user: { id: '1', email: 'test@example.com' },
      isLoading: false,
      signIn: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AuthContext.Provider value={mockContext}>{children}</AuthContext.Provider>
    );

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current).toBe(mockContext);
  });

  it('throws error when used outside of AuthProvider', () => {
    expect.assertions(1);

    try {
      renderHook(() => useAuth());
      // If we get here, the test should fail because we expect an error
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toEqual(new Error('useAuth must be used within an AuthProvider'));
    }
  });
});
