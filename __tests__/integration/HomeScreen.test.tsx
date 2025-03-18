import React from 'react';
import HomeScreen from '@/app/(tabs)/index';
import { renderWithProviders as render } from '__tests__/test-utils';

// Mock the useBottomTabOverflow hook
jest.mock('@/components/ui/TabBarBackground', () => ({
  useBottomTabOverflow: () => 0,
}));

// Mock the useTranslation hook
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common.welcome': 'Welcome!',
        'home.tryIt.title': 'Step 1: Try it',
        'home.tryIt.description': 'Edit {{file}} to get started',
        'home.explore.title': 'Step 2: Explore',
        'home.explore.description': 'Check out the example app',
        'home.freshStart.title': 'Step 3: Fresh Start',
        'home.freshStart.description': 'Run {{command}} to reset the project',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock moti module
jest.mock('moti');

describe('HomeScreen', () => {
  it('renders the welcome message', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Welcome!')).toBeTruthy();
  });

  it('renders the step instructions', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Step 1: Try it')).toBeTruthy();
    expect(getByText(/Edit/)).toBeTruthy();
  });

  it('renders the HelloWave component', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('hello-wave')).toBeTruthy();
  });

  it('renders with themed components', () => {
    const { getByText } = render(<HomeScreen />);
    const welcomeText = getByText('Welcome!');
    expect(welcomeText.props.className).toBeTruthy();
  });
});
