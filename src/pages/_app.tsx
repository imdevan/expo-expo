import { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

export default function App({ Component, pageProps }: AppProps) {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Add any global initialization logic here
    document.documentElement.classList.toggle('dark', colorScheme === 'dark');
  }, [colorScheme]);

  return <Component {...pageProps} />;
}
