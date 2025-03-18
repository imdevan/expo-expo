import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react-native';
import { AuthForm } from '@/components/AuthForm';
import { renderWithProviders as render } from '__tests__/test-utils';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('AuthForm', () => {
  const mockOnSubmit = jest.fn().mockImplementation(() => Promise.resolve());
  const mockOnToggleMode = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form by default', () => {
    render(
      <AuthForm
        onSubmit={mockOnSubmit}
        isLogin={true}
        isLoading={false}
        onToggleMode={mockOnToggleMode}
      />
    );

    expect(screen.getByPlaceholderText('auth.email')).toBeTruthy();
    expect(screen.getByPlaceholderText('auth.password')).toBeTruthy();
    expect(screen.getByText('auth.signIn')).toBeTruthy();
    expect(screen.getByText('auth.noAccount')).toBeTruthy();
  });

  it('renders signup form when isLogin is false', () => {
    render(
      <AuthForm
        onSubmit={mockOnSubmit}
        isLogin={false}
        isLoading={false}
        onToggleMode={mockOnToggleMode}
      />
    );

    expect(screen.getByText('auth.signUp')).toBeTruthy();
    expect(screen.getByText('auth.hasAccount')).toBeTruthy();
  });

  it('shows loading indicator when isLoading is true', () => {
    render(
      <AuthForm
        onSubmit={mockOnSubmit}
        isLogin={true}
        isLoading={true}
        onToggleMode={mockOnToggleMode}
      />
    );

    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Test error message';
    render(
      <AuthForm
        onSubmit={mockOnSubmit}
        isLogin={true}
        isLoading={false}
        error={{ message: errorMessage }}
        onToggleMode={mockOnToggleMode}
      />
    );

    expect(screen.getByText(errorMessage)).toBeTruthy();
  });

  it('calls onToggleMode when mode switch button is pressed', () => {
    render(
      <AuthForm
        onSubmit={mockOnSubmit}
        isLogin={true}
        isLoading={false}
        onToggleMode={mockOnToggleMode}
      />
    );

    fireEvent.press(screen.getByText('auth.noAccount'));
    expect(mockOnToggleMode).toHaveBeenCalledTimes(1);
  });

  it('validates and submits form with valid data', async () => {
    const validFormData = {
      email: 'test@example.com',
      password: 'password123',
    };

    render(
      <AuthForm
        onSubmit={mockOnSubmit}
        isLogin={true}
        isLoading={false}
        onToggleMode={mockOnToggleMode}
      />
    );

    const emailInput = screen.getByPlaceholderText('auth.email');
    const passwordInput = screen.getByPlaceholderText('auth.password');

    fireEvent.changeText(emailInput, validFormData.email);
    fireEvent.changeText(passwordInput, validFormData.password);

    const submitButton = screen.getByText('auth.signIn');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(validFormData);
    });
  });

  it('shows validation errors for invalid data', async () => {
    render(
      <AuthForm
        onSubmit={mockOnSubmit}
        isLogin={true}
        isLoading={false}
        onToggleMode={mockOnToggleMode}
      />
    );

    const emailInput = screen.getByPlaceholderText('auth.email');
    const passwordInput = screen.getByPlaceholderText('auth.password');

    fireEvent.changeText(emailInput, 'invalid-email');
    fireEvent.changeText(passwordInput, '123');

    const submitButton = screen.getByText('auth.signIn');
    fireEvent.press(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email format')).toBeTruthy();
      expect(screen.getByText('Password must be at least 6 characters')).toBeTruthy();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
