import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { usePathname } from 'expo-router';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
} from 'react-native-reanimated';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TAB_ROUTES = [
  '/(tabs)/',
  '/(tabs)/wishlist', 
  '/(tabs)/Cart',
  '/(tabs)/explore',
];

export default function TabPositionIndicator() {
  const pathname = usePathname();

  const currentTabIndex = useDerivedValue(() => {
    const currentPath = pathname === '/' ? '/(tabs)/' : pathname;
    const index = TAB_ROUTES.findIndex(route => route === currentPath);
    return Math.max(0, index);
  });

  const indicatorStyle = useAnimatedStyle(() => {
    const dotSize = 8;
    const spacing = 16;
    const totalWidth = TAB_ROUTES.length * dotSize + (TAB_ROUTES.length - 1) * spacing;
    const startX = (SCREEN_WIDTH - totalWidth) / 2;
    
    return {
      transform: [
        {
          translateX: withSpring(
            startX + currentTabIndex.value * (dotSize + spacing),
            { damping: 20, stiffness: 90 }
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        {TAB_ROUTES.map((_, index) => (
          <View key={index} style={styles.dot} />
        ))}
        <Animated.View style={[styles.activeDot, indicatorStyle]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 90, // Above the tab bar
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 100,
    pointerEvents: 'none',
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 8,
  },
  activeDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e50914',
  },
});
