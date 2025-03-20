import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { ThemedText, ThemedTextProps } from './ThemedText';
import { IconSymbol, IconSymbolName } from './IconSymbol';
import { colors } from '@/styles/colors';
import styles from '@/styles/button';
import cn from 'classnames';

// Button must have a label or children but not both
type BaseButtonProps = Omit<TouchableOpacityProps, 'children'> & {
  variant?: keyof typeof styles.variants;
  size?: keyof typeof styles.sizes;
  icon?: IconSymbolName;
  iconSize?: number;
  fullWidth?: boolean;
  labelProps?: ThemedTextProps;
  active?: boolean;
  inline?: boolean;
};

type LabelButtonProps = BaseButtonProps & {
  label: string;
  children?: never;
};

type ChildrenButtonProps = BaseButtonProps & {
  label?: never;
  children: React.ReactNode;
};

type ButtonProps = LabelButtonProps | ChildrenButtonProps;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon,
  iconSize,
  label,
  labelProps,
  children,
  fullWidth = false,
  className = '',
  active = false,
  inline = false,
  ...props
}) => {
  const { currentTheme } = useTheme();

  return (
    <TouchableOpacity
      className={cn(
        inline ? styles.inline : styles.base,
        active
          ? styles.variants[variant].active[currentTheme]
          : styles.variants[variant][currentTheme],
        styles.sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}>
      {icon && <IconSymbol name={icon} size={iconSize} color={colors[currentTheme].text} />}
      {label ? <ThemedText {...labelProps}>{label}</ThemedText> : children}
    </TouchableOpacity>
  );
};
