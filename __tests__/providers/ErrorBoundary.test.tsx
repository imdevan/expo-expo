import React from 'react';
import { Text } from 'react-native';
import { render, screen, fireEvent, act } from '@testing-library/react-native';
import ErrorBoundary from '../../src/providers/ErrorBoundary';

// Mock console.error to prevent error output in tests
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

// Component that throws an error
const ThrowError = () => {
  throw new Error('Test error');
};

// Component that renders normally
const NormalComponent = () => <Text>Normal content</Text>;

describe('ErrorBoundary', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Restore console.error after all tests
    mockConsoleError.mockRestore();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <NormalComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Normal content')).toBeTruthy();
  });

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('Test error')).toBeTruthy();
  });

  it('renders default error message when error has no message', () => {
    // Override the ThrowError component to throw without a message
    const ThrowErrorWithoutMessage = () => {
      throw new Error();
    };

    render(
      <ErrorBoundary>
        <ThrowErrorWithoutMessage />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('An unexpected error occurred')).toBeTruthy();
  });

  it('calls console.error when an error occurs', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(mockConsoleError).toHaveBeenCalledWith(
      'Error caught by boundary:',
      expect.any(Error),
      expect.any(Object)
    );
  });

  it('handles nested error boundaries', () => {
    const NestedErrorBoundary = () => (
      <ErrorBoundary>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </ErrorBoundary>
    );

    render(<NestedErrorBoundary />);

    // Should show error UI from the innermost boundary
    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('Test error')).toBeTruthy();
  });

  it('handles async errors', async () => {
    const AsyncErrorComponent = () => {
      React.useEffect(() => {
        throw new Error('Async error');
      }, []);
      return <Text>Async content</Text>;
    };

    render(
      <ErrorBoundary>
        <AsyncErrorComponent />
      </ErrorBoundary>
    );

    // Wait for the error to be caught
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Something went wrong')).toBeTruthy();
    expect(screen.getByText('Async error')).toBeTruthy();
  });
});
