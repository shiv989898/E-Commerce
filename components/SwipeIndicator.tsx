import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
} from 'react-native-reanimated';
import { Feather } from '@expo/vector-icons';

interface SwipeIndicatorProps {
  visible: boolean;
  onComplete?: () => void;
}

export default function SwipeIndicator({ visible, onComplete }: SwipeIndicatorProps) {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (visible) {
      // Fade in the indicator
      opacity.value = withTiming(1, { duration: 300 });
      scale.value = withTiming(1, { duration: 300 });
      
      // Animate the swipe gesture
      translateX.value = withDelay(
        500,
        withRepeat(
          withSequence(
            withTiming(30, { duration: 800 }),
            withTiming(-30, { duration: 800 }),
            withTiming(0, { duration: 800 })
          ),
          2, // Repeat 2 times
          false
        )
      );

      // Auto-hide after animation
      const timer = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 500 });
        scale.value = withTiming(0.8, { duration: 500 });
        onComplete?.();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [
      { translateX: translateX.value },
      { scale: scale.value }
    ],
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.indicator}>
        <Feather name="chevrons-left" size={16} color="#e50914" />
        <Text style={styles.text}>Swipe to navigate</Text>
        <Feather name="chevrons-right" size={16} color="#e50914" />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  indicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#e50914',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 10,
  },
});
