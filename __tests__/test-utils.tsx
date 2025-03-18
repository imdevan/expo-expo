import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '@/providers/ThemeProvider';

export function renderWithProviders(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
}

// Re-export everything
export * from '@testing-library/react-native';
