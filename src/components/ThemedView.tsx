import { View, ViewProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import cn from 'classnames';

const variants = {
  default: {
    light: '',
    dark: '',
  },
  main: {
    light: 'bg-zinc-50',
    dark: 'bg-zinc-900',
  },
  primary: {
    light: 'bg-purple-50',
    dark: 'bg-purple-900',
  },
  secondary: {
    light: 'bg-blue-50',
    dark: 'bg-blue-900',
  },
} as const;

type VariantKeys = keyof typeof variants;

interface ThemedViewProps extends ViewProps {
  variant?: VariantKeys;
}

export function ThemedView({ variant = 'default', className, ...otherProps }: ThemedViewProps) {
  const { currentTheme } = useTheme();
  return <View className={cn(variants[variant][currentTheme], className)} {...otherProps} />;
}
