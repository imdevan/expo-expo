import React from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import { Form, Field } from 'react-final-form';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import { Button } from './ui/Button';

const authSchema = z.object({
  email: z.string().min(1, 'Required').email('Invalid email format'),
  password: z.string().min(1, 'Required').min(6, 'Password must be at least 6 characters'),
});

export type FormValues = z.infer<typeof authSchema>;

const validate = (values: FormValues) => {
  try {
    authSchema.parse(values);
    return {};
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors.reduce((acc, curr) => {
        const path = curr.path[0] as string;
        return { ...acc, [path]: curr.message };
      }, {});
    }
    return {};
  }
};

interface AuthFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
  isLogin: boolean;
  isLoading: boolean;
  error?: { message: string } | null;
  onToggleMode: () => void;
}

export function AuthForm({ onSubmit, isLogin, isLoading, error, onToggleMode }: AuthFormProps) {
  const { t } = useTranslation();

  const handleSubmit = async (values: FormValues) => {
    try {
      await onSubmit(values);
    } catch (error) {
      // Handle any submission errors
      console.error('Form submission error:', error);
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      validate={validate}
      render={({ handleSubmit }) => (
        <View className='flex flex-col gap-4'>
          <Field name='email'>
            {({ input, meta }) => (
              <View>
                <TextInput
                  className={cn(
                    `rounded-lg bg-input p-4 text-base text-gray-200 placeholder:text-gray-400 dark:text-gray-200 ${
                      meta.error && meta.touched ? 'border border-error' : ''
                    }`
                  )}
                  placeholder={t('auth.email')}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  onChangeText={input.onChange}
                  onBlur={() => input.onBlur()}
                  value={input.value}
                />
                {meta.error && meta.touched && (
                  <ThemedText className='mt-1 text-xs text-error'>{meta.error}</ThemedText>
                )}
              </View>
            )}
          </Field>

          <Field name='password'>
            {({ input, meta }) => (
              <View>
                <TextInput
                  className={`rounded-lg bg-black bg-input p-4 text-base text-gray-200 placeholder:text-gray-400 dark:text-gray-200 ${
                    meta.error && meta.touched ? 'border border-error' : ''
                  }`}
                  placeholder={t('auth.password')}
                  secureTextEntry
                  onChangeText={input.onChange}
                  onBlur={() => input.onBlur()}
                  value={input.value}
                />
                {meta.error && meta.touched && (
                  <ThemedText className='mt-1 text-xs text-error'>{meta.error}</ThemedText>
                )}
              </View>
            )}
          </Field>

          {error && <ThemedText className='mt-1 text-xs text-error'>{error.message}</ThemedText>}

          <Button
            variant='primary'
            className='mt-2.5'
            size='lg'
            onPress={handleSubmit}
            disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator testID='loading-indicator' color='#fff' />
            ) : (
              <ThemedText className='font-semibold'>
                {isLogin ? t('auth.signIn') : t('auth.signUp')}
              </ThemedText>
            )}
          </Button>

          <TouchableOpacity className='mt-4 items-center' onPress={onToggleMode}>
            <ThemedText>{isLogin ? t('auth.noAccount') : t('auth.hasAccount')}</ThemedText>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}
