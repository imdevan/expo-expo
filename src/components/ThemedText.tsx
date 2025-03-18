import { Text, TextProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import cn from 'classnames';

const variants = {
  default: {
    light: 'text-zinc-900',
    dark: 'text-zinc-50',
  },
  muted: {
    light: 'text-zinc-500',
    dark: 'text-zinc-400',
  },
  primary: {
    light: 'text-purple-600',
    dark: 'text-purple-400',
  },
  secondary: {
    light: 'text-blue-600',
    dark: 'text-blue-400',
  },
};

type VariantKeys = keyof typeof variants;

const types = {
  title: `text-2xl font-bold dark:text-white`,
  subtitle: `text-xl font-semibold dark:text-white`,
  defaultSemiBold: `font-semibold dark:text-white`,
  link: 'text-blue-500 underline',
  body: 'dark:text-gray-400',
};

type TypeKeys = keyof typeof types;

interface ThemedTextProps extends TextProps {
  variant?: VariantKeys;
  type?: TypeKeys;
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
        'text-base',
        variants[variant][currentTheme],
        `text-${size}`,
        `font-${weight}`,
        className
      )}
      {...otherProps}
    />
  );
}
