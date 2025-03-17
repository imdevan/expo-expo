import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { ThemedText } from './ThemedText';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconSymbol } from './ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/providers/ThemeProvider';

const { width } = Dimensions.get('window');
const MENU_WIDTH = width * 0.8;

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

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
      <MotiView
        testID='hamburger-menu'
        style={[styles.menu, { paddingTop: insets.top }]}
        animate={{
          translateX: isOpen ? 0 : -MENU_WIDTH,
        }}
        transition={{
          type: 'timing',
          duration: 300,
        }}>
        <View className='p-4'>
          <ThemedText className='mb-4 text-xl font-bold'>{t('menu.title')}</ThemedText>

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
                <IconSymbol name='sun.max.fill' size={24} color={Colors[currentTheme].text} />
                <ThemedText className='mt-1 text-sm'>{t('menu.light')}</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 items-center rounded-lg border p-3 ${
                  theme === 'dark'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                onPress={() => setTheme('dark')}>
                <IconSymbol name='moon.fill' size={24} color={Colors[currentTheme].text} />
                <ThemedText className='mt-1 text-sm'>{t('menu.dark')}</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 items-center rounded-lg border p-3 ${
                  theme === 'system'
                    ? 'border-primary bg-primary/10'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
                onPress={() => setTheme('system')}>
                <IconSymbol
                  name='circle.lefthalf.filled'
                  size={24}
                  color={Colors[currentTheme].text}
                />
                <ThemedText className='mt-1 text-sm'>{t('menu.auto')}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            className='border-b border-gray-200 py-3 dark:border-gray-700'
            onPress={() => {
              onClose();
              signOut();
            }}>
            <ThemedText className='text-lg'>{t('menu.signOut')}</ThemedText>
          </TouchableOpacity>
        </View>
      </MotiView>
    </>
  );
}

// Using StyleSheet create to play nice with MotiView
const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: MENU_WIDTH,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
});
