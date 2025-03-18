/**
 * Styles for typography
 * Used in ThemedText component
 */

export const base = 'text-base';

export const variants = {
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

export const types = {
  title: `text-2xl font-bold`,
  subtitle: `text-xl font-semibold`,
  defaultSemiBold: `font-semibold`,
  link: 'text-blue-500 underline',
  body: 'dark:text-gray-400',
};
