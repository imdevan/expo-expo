import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useTheme } from '@/providers/ThemeProvider';
import { router } from 'expo-router';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { HeaderMenuButton } from '@/components/HeaderMenuButton';
import { HamburgerMenu } from '@/components/HamburgerMenu';

export default function TabLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentTheme } = useTheme();

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[currentTheme ?? 'light'].tabIconSelected,
          tabBarInactiveTintColor: Colors[currentTheme ?? 'light'].tabIconDefault,
          headerShown: true,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: 'absolute',
            },
            default: {},
          }),
          headerLeft: () => <HeaderMenuButton onPress={() => setIsMenuOpen(true)} />,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push('/logout')} style={{ marginRight: 15 }}>
              <IconSymbol
                name='rectangle.portrait.and.arrow.right'
                color={Colors[currentTheme ?? 'light'].text}
              />
            </TouchableOpacity>
          ),
        }}>
        <Tabs.Screen
          name='index'
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name='house.fill' color={color} />,
          }}
        />
        <Tabs.Screen
          name='explore'
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name='paperplane.fill' color={color} />
            ),
          }}
        />
      </Tabs>

      <HamburgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
