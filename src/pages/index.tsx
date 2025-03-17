import { useEffect } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

export default function WebIndex() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the main app route
    router.replace('/(tabs)');
  }, [router]);

  return <View />;
}
