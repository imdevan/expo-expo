import { View, ViewProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import cn from 'classnames';
import { variants } from '@/styles/bg';

interface ThemedViewProps extends ViewProps {
  variant?: keyof typeof variants;
}

export function ThemedView({ variant = 'default', className, ...otherProps }: ThemedViewProps) {
  const { currentTheme } = useTheme();
  return <View className={cn(variants[variant][currentTheme], className)} {...otherProps} />;
}
