import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import AuthScreen from '@/app/auth';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';

jest.mock('@/hooks/useAuth');
jest.mock('expo-router');
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('AuthScreen', () => {
  const mockSignIn = jest.fn();
  const mockSignUp = jest.fn();
  const mockRouter = { replace: jest.fn() };

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signUp: mockSignUp,
      isLoading: false,
      error: null,
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('validates required fields', async () => {
    render(<AuthScreen />);

    const submitButton = screen.getByText('auth.signIn');
    fireEvent.press(submitButton);

    await waitFor(() => {
      const errorMessages = screen.getAllByText('Required');
      expect(errorMessages.length).toBe(2); // Both email and password are required
    });
  });

  it('validates email format', async () => {
    render(<AuthScreen />);

    const emailInput = screen.getByPlaceholderText('auth.email');
    const passwordInput = screen.getByPlaceholderText('auth.password');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, 'password123');

    const submitButton = screen.getByText('auth.signIn');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeTruthy();
    });
  });

  it('validates password length', async () => {
    render(<AuthScreen />);

    const emailInput = screen.getByPlaceholderText('auth.email');
    const passwordInput = screen.getByPlaceholderText('auth.password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, '123');

    const submitButton = screen.getByText('auth.signIn');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Password must be at least 6 characters')).toBeTruthy();
    });
  });

  it('submits form with valid data', async () => {
    mockSignIn.mockResolvedValueOnce({ error: null });

    render(<AuthScreen />);

    const emailInput = screen.getByPlaceholderText('auth.email');
    const passwordInput = screen.getByPlaceholderText('auth.password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');

    const submitButton = screen.getByText('auth.signIn');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockRouter.replace).toHaveBeenCalledWith('/(tabs)');
    });
  });

  it('shows loading indicator when submitting', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signUp: mockSignUp,
      isLoading: true,
      error: null,
    });

    render(<AuthScreen />);

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays error message when authentication fails', async () => {
    const errorMessage = 'Invalid credentials';
    (useAuth as jest.Mock).mockReturnValue({
      signIn: mockSignIn,
      signUp: mockSignUp,
      isLoading: false,
      error: { message: errorMessage },
    });

    render(<AuthScreen />);

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it('toggles between login and signup modes', () => {
    render(<AuthScreen />);

    // Initially in login mode
    expect(screen.getByText('auth.welcomeBack')).toBeTruthy();

    // Switch to signup mode
    fireEvent.press(screen.getByText('auth.noAccount'));
    expect(screen.getByText('auth.createAccount')).toBeTruthy();

    // Switch back to login mode
    fireEvent.press(screen.getByText('auth.hasAccount'));
    expect(screen.getByText('auth.welcomeBack')).toBeTruthy();
  });
});
