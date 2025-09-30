import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet, ViewStyle, StyleProp } from 'react-native';

type BlurTabBarBackgroundProps = {
  style?: StyleProp<ViewStyle>;
};

export default function BlurTabBarBackground({ style }: BlurTabBarBackgroundProps) {
  return (
    <BlurView
      tint="systemChromeMaterial"
      intensity={100}
      style={[StyleSheet.absoluteFill, style]}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
