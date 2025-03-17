import React, { useEffect, useState } from 'react';
import { useSegments, useRouter } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { View } from 'react-native';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isInitialRender, setIsInitialRender] = useState(true);

  useEffect(() => {
    // Skip the first render
    if (isInitialRender) {
      setIsInitialRender(false);
      return;
    }

    // Add a small delay to ensure root layout is mounted
    const timer = setTimeout(() => {
      const inAuthGroup = segments[0] === 'auth';

      if (!user && !inAuthGroup) {
        // Redirect to auth page if not authenticated
        router.replace('/auth');
      } else if (user && inAuthGroup) {
        // Redirect to home if authenticated and trying to access auth page
        router.replace('/(tabs)');
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [user, segments, isInitialRender, router]);

  // Show a loading state while checking auth state
  if (isLoading || isInitialRender) {
    return <View />;
  }

  return <>{children}</>;
}
