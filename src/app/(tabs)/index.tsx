import { Image, StyleSheet, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import React from 'react';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const { t } = useTranslation();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('common.welcome')}</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('home.tryIt.title')}</ThemedText>
        <ThemedText>
          {t('home.tryIt.description').split('{{file}}').map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {index === 0 && <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>}
            </React.Fragment>
          ))}
          {' '}
          {t('home.tryIt.press')}{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>
          {' '}
          {t('home.tryIt.toOpen')}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('home.explore.title')}</ThemedText>
        <ThemedText>{t('home.explore.description')}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">{t('home.freshStart.title')}</ThemedText>
        <ThemedText>
          {t('home.freshStart.description', {
            command: <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>,
            appDir: <ThemedText type="defaultSemiBold">app</ThemedText>,
            exampleDir: <ThemedText type="defaultSemiBold">app-example</ThemedText>
          })}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
