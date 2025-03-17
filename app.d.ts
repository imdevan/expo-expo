/// <reference types="nativewind/types" />
declare module 'nativewind/styled' {
  import type { ComponentType } from 'react';
  import type { ViewProps, TextProps, ImageProps, ScrollViewProps } from 'react-native';

  export function styled<T>(component: ComponentType<T>): ComponentType<T & { className?: string }>;
  export const StyledView: ComponentType<ViewProps & { className?: string }>;
  export const StyledText: ComponentType<TextProps & { className?: string }>;
  export const StyledImage: ComponentType<ImageProps & { className?: string }>;
  export const StyledScrollView: ComponentType<ScrollViewProps & { className?: string }>;
}
