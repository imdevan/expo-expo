import { MotiView } from 'moti';
import { View } from 'react-native';
import { ThemedText } from '@/components/ui/ThemedText';

export function HelloWave() {
  return (
    <View className='relative flex-row items-center justify-center'>
      <MotiView
        from={{ rotate: '0deg' }}
        animate={{ rotate: '25deg' }}
        transition={{
          type: 'timing',
          duration: 300,
          loop: true,
          repeatReverse: true,
        }}
        testID='hello-wave'>
        <ThemedText className='mt-[-6px] text-3xl leading-6'>👋</ThemedText>
      </MotiView>
    </View>
  );
}
