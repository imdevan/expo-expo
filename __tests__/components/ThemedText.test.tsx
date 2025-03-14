import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemedText } from '@/components/ThemedText';

// Mock the useThemeColor hook
jest.mock('@/hooks/useThemeColor', () => ({
  useThemeColor: () => '#000000',
}));

describe('ThemedText', () => {
  it('renders with default props', () => {
    const { getByText } = render(<ThemedText>Hello World</ThemedText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders with different text types', () => {
    const { getByText } = render(
      <>
        <ThemedText type="title">Title Text</ThemedText>
        <ThemedText type="subtitle">Subtitle Text</ThemedText>
        <ThemedText type="link">Link Text</ThemedText>
      </>
    );

    expect(getByText('Title Text')).toBeTruthy();
    expect(getByText('Subtitle Text')).toBeTruthy();
    expect(getByText('Link Text')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const customStyle = { fontSize: 24 };
    const { getByText } = render(
      <ThemedText style={customStyle}>Custom Style Text</ThemedText>
    );
    const textElement = getByText('Custom Style Text');
    expect(textElement.props.style).toContainEqual(customStyle);
  });

  it('renders with custom colors', () => {
    const { getByText } = render(
      <ThemedText lightColor="#ffffff" darkColor="#000000">
        Colored Text
      </ThemedText>
    );
    expect(getByText('Colored Text')).toBeTruthy();
  });
}); 