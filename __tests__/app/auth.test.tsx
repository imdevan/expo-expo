import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Auth from '@/app/auth';
import { useAuth } from '@/hooks/useAuth';
import { mockUser, mockRouter } from '../setup';

// Mock the dependencies
jest.mock('@/hooks/useAuth');

describe('AuthScreen', () => {
  const mockSignIn = jest.fn();
  const mockSignUp = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signUp: mockSignUp,
      isLoading: false,
      error: null,
    });
  });

  it('renders login form by default', () => {
    const { getByPlaceholderText, getByText } = render(<Auth />);

    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('switches between login and signup modes', () => {
    const { getByText } = render(<Auth />);

    fireEvent.press(getByText("Don't have an account? Sign Up"));
    expect(getByText('Sign Up')).toBeTruthy();

    fireEvent.press(getByText('Already have an account? Sign In'));
    expect(getByText('Sign In')).toBeTruthy();
  });

  it('handles sign in successfully', async () => {
    mockSignIn.mockResolvedValue({ user: mockUser, error: null });

    const { getByPlaceholderText, getByText } = render(<Auth />);

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Sign In'));

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });

    // Wait for the navigation to occur after the setTimeout
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
    }, { timeout: 100 });
  });

  it('handles sign up successfully', async () => {
    mockSignUp.mockResolvedValue({ user: mockUser, error: null });

    const { getByPlaceholderText, getByText } = render(<Auth />);

    // Switch to signup mode
    fireEvent.press(getByText("Don't have an account? Sign Up"));

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.press(getByText('Sign Up'));

    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password',
      });
    });

    // Wait for the navigation to occur after the setTimeout
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
    }, { timeout: 100 });
  });

  it('displays error messages', async () => {
    const errorMessage = 'Invalid credentials';
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signUp: mockSignUp,
      isLoading: false,
      error: new Error(errorMessage),
    });

    const { getByText } = render(<Auth />);
    expect(getByText(errorMessage)).toBeTruthy();
  });

  it('shows loading state during authentication', () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signUp: mockSignUp,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = render(<Auth />);
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });
}); 