import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffffff', dark: '#f0ededff' }}
      headerImage={
        <Image
          source={require('@/assets/images/icon-cadastro.png')}
          style={styles.reactLogo}
        />
      }>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: { 
    height: 180,
    width: 290,
    bottom: 0,
    left: 45,
    position: 'absolute',
  },
});
