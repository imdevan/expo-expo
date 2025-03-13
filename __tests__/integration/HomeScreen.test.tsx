import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '@/app/(tabs)/index';

// Mock the ParallaxScrollView component to simplify testing
jest.mock('@/components/ParallaxScrollView', () => {
  return function MockParallaxScrollView({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  };
});

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
    // Note: You'll need to add testID="hello-wave" to your HelloWave component
    expect(getByTestId('hello-wave')).toBeTruthy();
  });

  it('renders with themed components', () => {
    const { getByText } = render(<HomeScreen />);
    const welcomeText = getByText('Welcome!');
    expect(welcomeText.props.style).toBeTruthy();
  });
}); 