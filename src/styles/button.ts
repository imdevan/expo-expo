/**
 * Styles for buttons=
 * Used in ThemedView component
 */
// export const base = 'flex-row items-center justify-center rounded-lg border';

export const base = 'flex-1 items-center rounded-lg border';
export const inline = 'flex-row items-center space-x-3 rounded-lg';
export const variants = {
  default: {
    light: 'bg-primary border-primary/10',
    dark: 'bg-primary/90 border-primary/90',
    active: {
      light: 'border-primary bg-primary/10',
      dark: 'border-primary bg-primary/10',
    },
  },
  primary: {
    light: 'bg-primary border-primary',
    dark: 'bg-primary/90 border-primary/90',
    active: {
      light: 'border-primary bg-primary/10',
      dark: 'border-primary bg-primary/10',
    },
  },
  secondary: {
    light: 'bg-primary/10 border-primary',
    dark: 'bg-primary/20 border-primary/80',
    active: {
      light: 'border-primary bg-primary/10',
      dark: 'border-primary bg-primary/10',
    },
  },
  translucent: {
    light: 'bg-transparent border-gray-200',
    dark: 'bg-transparent border-gray-700',
    active: {
      light: 'border-primary bg-primary/10',
      dark: 'border-primary bg-primary/10',
    },
  },
  outline: {
    light: 'bg-transparent border-primary',
    dark: 'bg-transparent border-primary/80',
    active: {
      light: 'border-primary bg-primary/10',
      dark: 'border-primary bg-primary/10',
    },
  },
  ghost: {
    light: 'bg-transparent border-transparent',
    dark: 'bg-transparent border-transparent',
    active: {
      light: 'hover:bg-gray-100',
      dark: 'hover:bg-gray-800',
    },
  },
};

export const sizes = {
  sm: 'p-2',
  md: 'p-3',
  lg: 'p-4',
};

export default {
  base,
  inline,
  variants,
  sizes,
};
