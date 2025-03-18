import { PropsWithChildren, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/providers/ThemeProvider';

export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme } = useTheme();

  return (
    <ThemedView>
      <TouchableOpacity
        className='flex-row items-center gap-1.5'
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}>
        <IconSymbol
          name='chevron.right'
          size={18}
          weight='medium'
          color={currentTheme === 'light' ? Colors.light.icon : Colors.dark.icon}
          className={`transition-transform ${isOpen ? 'rotate-90' : 'rotate-0'}`}
        />
        <ThemedText type='defaultSemiBold'>{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView className='ml-6 mt-1.5'>{children}</ThemedView>}
    </ThemedView>
  );
}
