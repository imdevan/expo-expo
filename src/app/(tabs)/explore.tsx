import { Image, Platform, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabTwoScreen() {
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
          style={{ backgroundColor: colorScheme === 'light' ? '#D0D0D0' : '#353636' }}>
          <IconSymbol
            size={310}
            color='#808080'
            name='chevron.left.forwardslash.chevron.right'
            className='absolute -bottom-[90px] -left-[35px]'
          />
        </ThemedView>
        <ThemedView className='flex-1 gap-4 overflow-hidden p-8'>
          <ThemedView className='flex-row gap-2'>
            <ThemedText type='title'>{t('explore.title')}</ThemedText>
          </ThemedView>
          <ThemedText className='mb-5'>{t('explore.description')}</ThemedText>
          <Collapsible title={t('explore.sections.routing.title')}>
            <ThemedText>
              {t('explore.sections.routing.description', {
                screen1: <ThemedText type='defaultSemiBold'>Home</ThemedText>,
                screen2: <ThemedText type='defaultSemiBold'>Explore</ThemedText>,
              })}
            </ThemedText>
            <ThemedText>
              {t('explore.sections.routing.layout', {
                file: <ThemedText type='defaultSemiBold'>app/(tabs)/_layout.tsx</ThemedText>,
              })}
            </ThemedText>
            <ExternalLink href='https://docs.expo.dev/router/introduction/'>
              <ThemedText type='link'>{t('explore.sections.routing.learnMore')}</ThemedText>
            </ExternalLink>
          </Collapsible>
          <Collapsible title={t('explore.sections.platform.title')}>
            <ThemedText>
              {t('explore.sections.platform.description', {
                key: <ThemedText type='defaultSemiBold'>w</ThemedText>,
              })}
            </ThemedText>
          </Collapsible>
          <Collapsible title={t('explore.sections.images.title')}>
            <ThemedText>
              {t('explore.sections.images.description', {
                suffix1: <ThemedText type='defaultSemiBold'>@2x</ThemedText>,
                suffix2: <ThemedText type='defaultSemiBold'>@3x</ThemedText>,
              })}
            </ThemedText>
            <Image source={require('@assets/images/react-logo.png')} className='self-center' />
            <ExternalLink href='https://reactnative.dev/docs/images'>
              <ThemedText type='link'>{t('explore.sections.routing.learnMore')}</ThemedText>
            </ExternalLink>
          </Collapsible>
          <Collapsible title={t('explore.sections.fonts.title')}>
            <ThemedText>
              {t('explore.sections.fonts.description', {
                file: <ThemedText type='defaultSemiBold'>app/_layout.tsx</ThemedText>,
              })}
            </ThemedText>
            <ExternalLink href='https://docs.expo.dev/versions/latest/sdk/font'>
              <ThemedText type='link'>{t('explore.sections.routing.learnMore')}</ThemedText>
            </ExternalLink>
          </Collapsible>
          <Collapsible title={t('explore.sections.themes.title')}>
            <ThemedText>
              {t('explore.sections.themes.description', {
                hook: <ThemedText type='defaultSemiBold'>useColorScheme()</ThemedText>,
              })}
            </ThemedText>
            <ExternalLink href='https://docs.expo.dev/develop/user-interface/color-themes/'>
              <ThemedText type='link'>{t('explore.sections.routing.learnMore')}</ThemedText>
            </ExternalLink>
          </Collapsible>
          <Collapsible title='Animations'>
            <ThemedText>
              This template includes an example of an animated component. The{' '}
              <ThemedText type='defaultSemiBold'>components/HelloWave.tsx</ThemedText> component
              uses the powerful{' '}
              <ThemedText type='defaultSemiBold'>react-native-reanimated</ThemedText> library to
              create a waving hand animation.
            </ThemedText>
          </Collapsible>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}
