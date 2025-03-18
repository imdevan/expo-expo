import React from 'react';
import { ThemedText } from '@/components/ThemedText';
import { renderWithProviders as render } from '__tests__/test-utils';

describe('ThemedText', () => {
  it('renders with default props', () => {
    const { getByText } = render(<ThemedText>Hello World</ThemedText>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('renders with different text types', () => {
    const { getByText } = render(
      <>
        <ThemedText type='title'>Title Text</ThemedText>
        <ThemedText type='subtitle'>Subtitle Text</ThemedText>
        <ThemedText type='link'>Link Text</ThemedText>
      </>
    );

    expect(getByText('Title Text')).toBeTruthy();
    expect(getByText('Subtitle Text')).toBeTruthy();
    expect(getByText('Link Text')).toBeTruthy();
  });

  it('applies custom styles', () => {
    const { getByText } = render(<ThemedText className='text-2xl'>Custom Style Text</ThemedText>);
    const textElement = getByText('Custom Style Text');
    expect(textElement.props.className).toContain('text-2xl');
  });

  it('renders with custom colors', () => {
    const { getByText } = render(
      <ThemedText lightColor='#ffffff' darkColor='#000000'>
        Colored Text
      </ThemedText>
    );
    expect(getByText('Colored Text')).toBeTruthy();
  });
});
