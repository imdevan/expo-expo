import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';

export default function LogoutScreen() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      await signOut();
      // Use requestAnimationFrame to ensure the next frame is rendered
      requestAnimationFrame(() => {
        router.replace('/auth');
      });
    };
    handleLogout();
  }, []);

  return null; // No need to render anything as we're just handling the logout
} 