import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/providers/AuthProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Head } from 'expo-head';
import { HelmetProvider } from 'react-helmet-async';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      // Add a small delay to ensure everything is mounted
      const timer = setTimeout(() => {
        setIsReady(true);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded || !isReady) {
    return null;
  }

  return (
    <HelmetProvider>
      <AuthProvider>
        <ProtectedRoute>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Head>
              <title>Expo App</title>
            </Head>
            <Slot />
            <StatusBar style="auto" />
          </ThemeProvider>
        </ProtectedRoute>
      </AuthProvider>
    </HelmetProvider>
  );
}
