import { Image, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function HomeScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? 'light';
  const bottom = useBottomTabOverflow();

  return (
    <ThemedView className='flex-1'>
      <ScrollView
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}>
        <ThemedView
          className='h-[250px] overflow-hidden'
          style={{ backgroundColor: colorScheme === 'light' ? '#A1CEDC' : '#1D3D47' }}>
          <Image
            source={require('@assets/images/partial-react-logo.png')}
            className='absolute bottom-0 left-0 h-[178px] w-[290px]'
          />
        </ThemedView>
        <ThemedView className='flex-1 gap-4 overflow-hidden p-8'>
          <ThemedView className='flex-row items-center gap-2'>
            <ThemedText type='title'>{t('common.welcome')}</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView className='mb-2 gap-2'>
            <ThemedText type='subtitle'>{t('home.tryIt.title')}</ThemedText>
            <ThemedText>
              {t('home.tryIt.description')
                .split('{{file}}')
                .map((part, index) => (
                  <React.Fragment key={index}>
                    {part}
                    {index === 0 && (
                      <ThemedText type='defaultSemiBold'>app/(tabs)/index.tsx</ThemedText>
                    )}
                  </React.Fragment>
                ))}{' '}
              {t('home.tryIt.press')}{' '}
              <ThemedText type='defaultSemiBold'>
                {Platform.select({
                  ios: 'cmd + d',
                  android: 'cmd + m',
                  web: 'F12',
                })}
              </ThemedText>{' '}
              {t('home.tryIt.toOpen')}
            </ThemedText>
          </ThemedView>
          <ThemedView className='mb-2 gap-2'>
            <ThemedText type='subtitle'>{t('home.explore.title')}</ThemedText>
            <ThemedText>{t('home.explore.description')}</ThemedText>
          </ThemedView>
          <ThemedView className='mb-2 gap-2'>
            <ThemedText type='subtitle'>{t('home.freshStart.title')}</ThemedText>
            <ThemedText>
              {t('home.freshStart.description', {
                command: <ThemedText type='defaultSemiBold'>npm run reset-project</ThemedText>,
                appDir: <ThemedText type='defaultSemiBold'>app</ThemedText>,
                exampleDir: <ThemedText type='defaultSemiBold'>app-example</ThemedText>,
              })}
            </ThemedText>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
