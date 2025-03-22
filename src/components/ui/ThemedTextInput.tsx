import { TextInput, TextInputProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import cn from 'classnames';
import { base, variants as TextVariants, types } from '@/styles/typography';

const inputBase = 'rounded-lg bg-input p-4 placeholder-gray-400';

const variants = {
  ...TextVariants,
  default: {
    light: TextVariants.default.light,
    dark: TextVariants.default.light,
  },
};
export interface ThemedTextProps extends TextInputProps {
  variant?: keyof typeof variants;
  type?: keyof typeof types;
  error?: boolean;
  touched?: boolean;
}

export function ThemedTextInput({
  variant = 'default',
  className,
  error,
  touched,
  ...otherProps
}: ThemedTextProps) {
  const { currentTheme } = useTheme();

  return (
    <TextInput
      className={cn(
        base,
        inputBase,
        variants[variant][currentTheme],
        error && touched ? 'border border-error' : '',
        className
      )}
      {...otherProps}
    />
  );
}
