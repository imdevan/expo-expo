import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { MotiView } from 'moti';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/providers/ThemeProvider';
// import { styled } from 'nativewind/styled';
import { cssInterop } from 'nativewind';
import cn from 'classnames';

const { width } = Dimensions.get('window');
const MENU_WIDTH = Platform.select({
  web: Math.min(width * 0.4, 400), // Smaller width on web, max 400px
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
              <IconSymbol name='xmark.circle.fill' color={Colors[currentTheme ?? 'light'].text} />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View className='flex-1 p-4'>
            <View className='flex h-full flex-col justify-between'>
              {/* Theme Switcher */}
              <View className='mb-4'>
                <ThemedText className='mb-2 text-lg font-semibold'>{t('menu.theme')}</ThemedText>
                <View className='flex-row gap-2'>
                  <TouchableOpacity
                    className={`flex-1 items-center rounded-lg border p-3 ${
                      theme === 'light'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    onPress={() => setTheme('light')}>
                    <IconSymbol name='sun.max.fill' color={Colors[currentTheme].text} />
                    <ThemedText className='mt-1 text-sm'>{t('menu.light')}</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 items-center rounded-lg border p-3 ${
                      theme === 'dark'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    onPress={() => setTheme('dark')}>
                    <IconSymbol name='moon.fill' color={Colors[currentTheme].text} />
                    <ThemedText className='mt-1 text-sm'>{t('menu.dark')}</ThemedText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className={`flex-1 items-center rounded-lg border p-3 ${
                      theme === 'system'
                        ? 'border-primary bg-primary/10'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                    onPress={() => setTheme('system')}>
                    <IconSymbol name='circle.lefthalf.filled' color={Colors[currentTheme].text} />
                    <ThemedText className='mt-1 text-sm'>{t('menu.auto')}</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>

              {/* sign out */}
              <TouchableOpacity
                className='flex-row items-center space-x-3 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-gray-800'
                onPress={() => {
                  onClose();
                  signOut();
                }}>
                <IconSymbol
                  name='rectangle.portrait.and.arrow.right'
                  size={20}
                  color={Colors[currentTheme ?? 'light'].text}
                />
                <ThemedText>{t('menu.signOut')}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </ThemedView>
      </StyledMotiView>
    </>
  );
}

const styles = StyleSheet.create({
  menu: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // display: 'flex',
    // width: MENU_WIDTH,
    // backgroundColor: 'white',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
    // zIndex: 1000,
  },
});
