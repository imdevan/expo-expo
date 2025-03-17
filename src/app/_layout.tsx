import '@/styles/global.css';
import '@/i18n/i18n';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { AuthProvider } from '@/providers/AuthProvider';
import { ThemeProvider, useTheme } from '@/providers/ThemeProvider';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Head } from 'expo-head';
import { HelmetProvider } from 'react-helmet-async';
import { View } from 'react-native';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppContent() {
  const [isReady, setIsReady] = useState(false);
  const [loaded] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
  });
  const { currentTheme } = useTheme();

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
    return <View />;
  }

  return (
    <NavigationThemeProvider value={currentTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Head>
        <title>Expo App</title>
      </Head>
      <View style={{ flex: 1 }}>
        <ProtectedRoute>
          <Slot />
        </ProtectedRoute>
      </View>
      <StatusBar style='auto' />
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}
