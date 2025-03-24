import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useTheme } from './ThemeProvider';

export function NavigationThemeProvider({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();

  return (
    <ThemeProvider value={currentTheme === 'dark' ? DarkTheme : DefaultTheme}>
      {children}
    </ThemeProvider>
  );
}
