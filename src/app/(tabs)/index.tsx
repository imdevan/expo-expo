import React from 'react';
import { Image, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? 'light';
  const bottomTabOverflow = useBottomTabOverflow();

  return (
    <ThemedView className='flex-1'>
      <ScrollView
        className='flex-1'
        contentContainerStyle={{
          paddingBottom: bottomTabOverflow ? 100 : 80,
        }}>
        <View className='p-4'>
          <View className='mb-4 flex-row items-center'>
            <ThemedText className='mr-2 text-2xl font-bold'>{t('common.welcome')}</ThemedText>
            <HelloWave />
          </View>

          <ThemedView className='mb-4 rounded-lg p-4'>
            <ThemedText className='mb-2 text-lg font-semibold'>{t('home.tryIt.title')}</ThemedText>
            <ThemedText>
              {t('home.tryIt.description', { file: 'src/app/(tabs)/index.tsx' })}
            </ThemedText>
          </ThemedView>

          <ThemedView className='mb-4 rounded-lg p-4'>
            <ThemedText className='mb-2 text-lg font-semibold'>
              {t('home.explore.title')}
            </ThemedText>
            <ThemedText>{t('home.explore.description')}</ThemedText>
          </ThemedView>

          <ThemedView className='rounded-lg p-4'>
            <ThemedText className='mb-2 text-lg font-semibold'>
              {t('home.freshStart.title')}
            </ThemedText>
            <ThemedText>{t('home.freshStart.description', { command: 'yarn reset' })}</ThemedText>
          </ThemedView>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
