import React from 'react';
import { View } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTranslation } from 'react-i18next';
import { AuthForm, FormValues } from '@/components/AuthForm';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = React.useState(true);
  const { signIn, signUp, isLoading, error } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const onSubmit = async (values: FormValues) => {
    const response = isLogin
      ? await signIn(values)
      : await signUp(values);
    
    if (!response.error) {
      router.replace('/(tabs)');
    }
  };
 
  return (
    <View className="flex-1 p-5 justify-center w-[80%] mx-auto">
      <ThemedText type="title" className="text-center mb-8">
        {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
      </ThemedText>

      <AuthForm
        onSubmit={onSubmit}
        isLogin={isLogin}
        isLoading={isLoading}
        error={error}
        onToggleMode={() => setIsLogin(!isLogin)}
      />
    </View>
  );
}