import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useTheme } from '@/providers/ThemeProvider';
export default function App({ Component, pageProps }: AppProps) {
  const { currentTheme } = useTheme();

  useEffect(() => {
    // Add any global initialization logic here
    document.documentElement.classList.toggle('dark', currentTheme === 'dark');
  }, [currentTheme]);

  return <Component {...pageProps} />;
}
