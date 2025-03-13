import { StyleSheet, Image, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  const { t } = useTranslation();
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">{t('explore.title')}</ThemedText>
      </ThemedView>
      <ThemedText style={{ marginBottom: 20 }}>{t('explore.description')}</ThemedText>
      <Collapsible title={t('explore.sections.routing.title')}>
        <ThemedText>
          {t('explore.sections.routing.description', {
            screen1: <ThemedText type="defaultSemiBold">Home</ThemedText>,
            screen2: <ThemedText type="defaultSemiBold">Explore</ThemedText>
          })}
        </ThemedText>
        <ThemedText>
          {t('explore.sections.routing.layout', {
            file: <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>
          })}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction/">
          <ThemedText type="link">{t('explore.sections.routing.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.sections.platform.title')}>
        <ThemedText>
          {t('explore.sections.platform.description', {
            key: <ThemedText type="defaultSemiBold">w</ThemedText>
          })}
        </ThemedText>
      </Collapsible>
      <Collapsible title={t('explore.sections.images.title')}>
        <ThemedText>
          {t('explore.sections.images.description', {
            suffix1: <ThemedText type="defaultSemiBold">@2x</ThemedText>,
            suffix2: <ThemedText type="defaultSemiBold">@3x</ThemedText>
          })}
        </ThemedText>
        <Image source={require('@assets/images/react-logo.png')} style={{ alignSelf: 'center' }} />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">{t('explore.sections.routing.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.sections.fonts.title')}>
        <ThemedText>
          {t('explore.sections.fonts.description', {
            file: <ThemedText type="defaultSemiBold">app/_layout.tsx</ThemedText>
          })}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/versions/latest/sdk/font">
          <ThemedText type="link">{t('explore.sections.routing.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title={t('explore.sections.themes.title')}>
        <ThemedText>
          {t('explore.sections.themes.description', {
            hook: <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText>
          })}
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">{t('explore.sections.routing.learnMore')}</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animations">
        <ThemedText>
          This template includes an example of an animated component. The{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> component uses
          the powerful <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>{' '}
          library to create a waving hand animation.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
