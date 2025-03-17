import React from 'react';
import { View } from 'react-native';

export const MotiView = ({ children, testID }: { children: React.ReactNode; testID?: string }) => (
  <View testID={testID}>{children}</View>
);
