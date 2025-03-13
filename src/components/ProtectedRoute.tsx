import React, { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'auth';

    if (!user && !inAuthGroup) {
      // Redirect to auth page if not authenticated
      router.replace('/auth');
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated and trying to access auth page
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading, router]);

  // Don't render anything while checking auth state
  if (isLoading) {
    return null;
  }

  return <>{children}</>;
} 