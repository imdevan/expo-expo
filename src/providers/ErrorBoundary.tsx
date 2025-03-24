import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * ErrorBoundary is a React component that catches and handles errors in its child components.
 * It renders an error page when an error occurs, otherwise it renders its children.
 */
export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    /**
     * We can capture the error with any error tracking tool
     * Like:
     *
     * Sentry.captureException(error);
     * crashlytics().recordError(error);
     * Bugsnag.notify(error)
     * rollbar.error(error)
     */
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render(): React.ReactElement {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </Text>
        </View>
      );
    }

    return <>{this.props.children}</>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  button: {
    fontSize: 16,
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});
