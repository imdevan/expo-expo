import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Redirect } from 'expo-router';
import { View } from 'react-native';

export default function LogoutScreen() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  // Use Redirect component instead of programmatic navigation
  return <Redirect href='/auth' />;
}
