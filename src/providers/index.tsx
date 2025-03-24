import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './AuthProvider';
import { ThemeProvider } from './ThemeProvider';
import ErrorBoundary from './ErrorBoundary';
import { NavigationThemeProvider } from './NavigationThemeProvider';

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ThemeProvider>
          <NavigationThemeProvider>
            <AuthProvider>{children}</AuthProvider>
          </NavigationThemeProvider>
        </ThemeProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}
