import { Text, TextProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import cn from 'classnames';
import { base, variants, types } from '@/styles/typography';

export interface ThemedTextProps extends TextProps {
  variant?: keyof typeof variants;
  type?: keyof typeof types;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export function ThemedText({
  variant = 'default',
  size = 'base',
  weight = 'normal',
  className,
  ...otherProps
}: ThemedTextProps) {
  const { currentTheme } = useTheme();

  return (
    <Text
      className={cn(
        base,
        variants[variant][currentTheme],
        `text-${size}`,
        `font-${weight}`,
        className
      )}
      {...otherProps}
    />
  );
}
