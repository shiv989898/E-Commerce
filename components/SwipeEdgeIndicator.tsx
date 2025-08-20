import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from 'react-native-reanimated';

interface SwipeEdgeIndicatorProps {
  translateX: SharedValue<number>;
  side: 'left' | 'right';
}

export default function SwipeEdgeIndicator({ translateX, side }: SwipeEdgeIndicatorProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const isLeftSide = side === 'left';
    const inputRange = isLeftSide ? [0, 50] : [-50, 0];
    const outputRange = isLeftSide ? [0, 1] : [1, 0];
    
    const opacity = interpolate(
      translateX.value,
      inputRange,
      outputRange,
      'clamp'
    );

    const scale = interpolate(
      translateX.value,
      inputRange,
      [0.8, 1.2],
      'clamp'
    );

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View style={[
      styles.container,
      side === 'left' ? styles.leftEdge : styles.rightEdge,
      animatedStyle
    ]}>
      <View style={[
        styles.indicator,
        side === 'left' ? styles.leftIndicator : styles.rightIndicator
      ]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 8,
    justifyContent: 'center',
    zIndex: 100,
    pointerEvents: 'none',
  },
  leftEdge: {
    left: 0,
  },
  rightEdge: {
    right: 0,
  },
  indicator: {
    width: 4,
    height: 60,
    borderRadius: 2,
  },
  leftIndicator: {
    backgroundColor: '#e50914',
    marginLeft: 2,
  },
  rightIndicator: {
    backgroundColor: '#e50914',
    marginRight: 2,
  },
});
