import '@/styles/global.css';
import '@/i18n/i18n';
import React from 'react';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Head } from 'expo-head';
import { View } from 'react-native';
import { Providers } from '@/providers';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function AppContent() {
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
    return <View />;
  }

  return (
    <>
      <Head>
        <title>Expo App</title>
      </Head>
      <View style={{ flex: 1 }}>
        <ProtectedRoute>
          <Slot />
        </ProtectedRoute>
      </View>
      <StatusBar style='auto' />
    </>
  );
}

export default function RootLayout() {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
}
