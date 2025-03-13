import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTranslation } from 'react-i18next';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const { signIn, signUp, isLoading, error } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (shouldNavigate) {
      router.replace('/(tabs)');
    }
  }, [shouldNavigate]);

  const handleSubmit = async () => {
    const credentials = { email, password };
    const response = isLogin ? await signIn(credentials) : await signUp(credentials);
    
    if (!response.error) {
      setShouldNavigate(true);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        {isLogin ? t('auth.welcomeBack') : t('auth.createAccount')}
      </ThemedText>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.input}
          placeholder={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && (
          <ThemedText style={styles.error}>
            {error.message}
          </ThemedText>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator testID="loading-indicator" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>
              {isLogin ? t('auth.signIn') : t('auth.signUp')}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => setIsLogin(!isLogin)}>
          <ThemedText>
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    gap: 15,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0a7ea4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  error: {
    color: '#ff4444',
    textAlign: 'center',
  },
}); 