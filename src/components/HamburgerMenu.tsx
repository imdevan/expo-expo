import React from 'react';
import { View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { MotiView } from 'moti';
import { ThemedText } from './ui/ThemedText';
import { ThemedView } from './ui/ThemedView';
import { Button } from './ui/Button';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from './ui/IconSymbol';
import { colors } from '@/styles/colors';
import { useTheme } from '@/providers/ThemeProvider';
import { cssInterop } from 'nativewind';
import cn from 'classnames';

const { width } = Dimensions.get('window');
const MENU_WIDTH = Platform.select({
  web: Math.min(width * 0.8, 400), // Smaller width on web, max 400px
  default: width * 0.8, // Original width for mobile
});

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const StyledMotiView = cssInterop(MotiView, {
  className: {
    target: 'style',
  },
});

export function HamburgerMenu({ isOpen, onClose }: HamburgerMenuProps) {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const { theme, setTheme, currentTheme } = useTheme();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <TouchableOpacity
          testID='menu-backdrop'
          className='absolute inset-0 bottom-0 left-0 right-0 top-0 bg-black/50'
          activeOpacity={1}
          onPress={onClose}
        />
      )}

      {/* Menu */}
      <StyledMotiView
        testID='hamburger-menu'
        style={{ width: MENU_WIDTH }}
        className={cn(`shadow-xxl absolute left-0 top-0 z-50 flex h-full flex-col`)}
        animate={{
          translateX: isOpen ? 0 : -MENU_WIDTH,
        }}
        transition={{
          type: 'timing',
          duration: 300,
        }}>
        <ThemedView
          variant='main'
          testID='hamburger-menu-content'
          style={{ paddingTop: insets.top }}
          className='h-full flex-1 flex-col'>
          {/* Header */}
          <View className='flex-row items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700'>
            <ThemedText type='title' className='text-lg'>
              {t('menu.title')}
            </ThemedText>
            <TouchableOpacity onPress={onClose}>
              <IconSymbol name='xmark.circle.fill' color={colors[currentTheme].text} />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View className='flex-1 p-4'>
            <View className='flex h-full flex-col justify-between'>
              {/* Theme Switcher */}
              <View className='mb-4'>
                <ThemedText className='mb-2 text-lg font-semibold'>{t('menu.theme')}</ThemedText>
                <View className='flex-row gap-2'>
                  <Button
                    active={theme === 'light'}
                    className={cn(theme === 'light' && 'border-primary bg-primary/10')}
                    variant='translucent'
                    icon='sun.max.fill'
                    onPress={() => setTheme('light')}>
                    <ThemedText className='mt-1 text-sm'>{t('menu.light')}</ThemedText>
                  </Button>
                  <Button
                    active={theme === 'dark'}
                    variant='translucent'
                    icon='moon.fill'
                    onPress={() => setTheme('dark')}>
                    <ThemedText className='mt-1 text-sm'>{t('menu.dark')}</ThemedText>
                  </Button>
                  <Button
                    active={theme === 'system'}
                    variant='translucent'
                    icon='circle.lefthalf.filled'
                    onPress={() => setTheme('system')}>
                    <ThemedText className='mt-1 text-sm'>{t('menu.auto')}</ThemedText>
                  </Button>
                </View>
              </View>

              {/* sign out */}
              <Button
                inline
                variant='ghost'
                icon='rectangle.portrait.and.arrow.right'
                iconSize={20}
                label={t('menu.signOut')}
                onPress={() => {
                  onClose();
                  signOut();
                }}
              />
            </View>
          </View>
        </ThemedView>
      </StyledMotiView>
    </>
  );
}
