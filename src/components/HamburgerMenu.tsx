import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { ThemedText } from './ThemedText';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/hooks/useAuth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
        // className={`absolute bottom-0 left-0 top-0 bg-white shadow-lg dark:bg-gray-900 w-[${MENU_WIDTH}] z-[1000]`}
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
