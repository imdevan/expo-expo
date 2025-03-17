import React from 'react';
import { Text } from 'react-native';

interface ThemedTextProps {
  children: React.ReactNode;
  type?: 'title' | 'body' | 'subtitle' | 'defaultSemiBold' | 'link';
  className?: string;
}

export function ThemedText({ children, type = 'body', className = '' }: ThemedTextProps) {
  const baseClasses = 'text-base';
  const textBaseClasses = 'dark:text-white';
  const typeClasses = {
    title: `text-2xl font-bold dark:text-white ${textBaseClasses}`,
    subtitle: `text-xl font-semibold dark:text-white ${textBaseClasses}`,
    defaultSemiBold: `font-semibold dark:text-white ${textBaseClasses}`,
    link: 'text-blue-500 underline',
    body: 'dark:text-gray-400'
  }[type];
  
  return (
    <Text className={`${baseClasses} ${typeClasses} ${className}`}>
      {children}
    </Text>
  );
}
