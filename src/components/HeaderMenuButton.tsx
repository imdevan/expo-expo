import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';

interface HeaderMenuButtonProps {
  onPress: () => void;
}

export function HeaderMenuButton({ onPress }: HeaderMenuButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} className='mx-4' testID='header-menu-button'>
      <ThemedText size='3xl'>☰</ThemedText>
    </TouchableOpacity>
  );
}
