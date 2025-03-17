import React, { useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { View } from 'react-native';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading || !isMounted) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      // Redirect to auth page if not authenticated
      router.replace('/auth');
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth page
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading, router, isMounted]);

  // Show a loading state while checking auth state
  if (isLoading || !isMounted) {
    return <View />;
  }

  return <>{children}</>;
}
