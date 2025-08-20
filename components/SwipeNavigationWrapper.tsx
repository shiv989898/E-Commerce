import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolateColor,
} from 'react-native-reanimated';
import { useRouter, usePathname } from 'expo-router';
import * as Haptics from 'expo-haptics';
import SwipeIndicator from './SwipeIndicator';
import SwipeEdgeIndicator from './SwipeEdgeIndicator';
import TabPositionIndicator from './TabPositionIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25; // 25% of screen width

interface SwipeNavigationWrapperProps {
  children: React.ReactNode;
}

// Define the tab routes in order for swipe navigation
const TAB_ROUTES = [
  { route: '/(tabs)/', navPath: '/' },           // Home (index)
  { route: '/(tabs)/wishlist', navPath: '/wishlist' },   // Wishlist  
  { route: '/(tabs)/Cart', navPath: '/Cart' },       // Cart
  { route: '/(tabs)/explore', navPath: '/explore' },    // Explore
];

export default function SwipeNavigationWrapper({ children }: SwipeNavigationWrapperProps) {
  const translateX = useSharedValue(0);
  const router = useRouter();
  const pathname = usePathname();
  const [showIndicator, setShowIndicator] = useState(false);

  // Show swipe indicator on first app launch
  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const hasSeenSwipeIndicator = await AsyncStorage.getItem('hasSeenSwipeIndicator');
        if (!hasSeenSwipeIndicator) {
          setTimeout(() => setShowIndicator(true), 1000); // Show after 1 second
        }
      } catch (error) {
        console.log('Error checking first launch:', error);
      }
    };
    
    checkFirstLaunch();
  }, []);

  const markIndicatorAsSeen = async () => {
    try {
      await AsyncStorage.setItem('hasSeenSwipeIndicator', 'true');
      setShowIndicator(false);
    } catch (error) {
      console.log('Error saving indicator status:', error);
    }
  };

  const getCurrentTabIndex = () => {
    // Normalize the current pathname for comparison
    const currentPath = pathname === '/' ? '/(tabs)/' : pathname;
    const index = TAB_ROUTES.findIndex(tab => tab.route === currentPath);
    return index >= 0 ? index : 0;
  };

  const navigateToTab = (direction: 'left' | 'right') => {
    const currentIndex = getCurrentTabIndex();
    let newIndex: number;

    if (direction === 'right') {
      // Swipe right = go to previous tab (left in array)
      newIndex = Math.max(0, currentIndex - 1);
    } else {
      // Swipe left = go to next tab (right in array)
      newIndex = Math.min(TAB_ROUTES.length - 1, currentIndex + 1);
    }

    if (newIndex !== currentIndex) {
      const targetTab = TAB_ROUTES[newIndex];
      // Provide haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      router.push(targetTab.navPath as any);
    }
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
    },
    onActive: (event, context) => {
      // Limit the translation to prevent excessive movement
      const maxTranslation = SCREEN_WIDTH * 0.3;
      translateX.value = Math.max(
        -maxTranslation,
        Math.min(maxTranslation, context.startX + event.translationX)
      );
    },
    onEnd: (event) => {
      const { translationX, velocityX } = event;
      
      // Determine swipe direction and threshold
      const shouldSwipe = Math.abs(translationX) > SWIPE_THRESHOLD || Math.abs(velocityX) > 500;
      
      if (shouldSwipe) {
        if (translationX > 0) {
          // Swiped right (go to previous tab)
          runOnJS(navigateToTab)('right');
        } else {
          // Swiped left (go to next tab)
          runOnJS(navigateToTab)('left');
        }
      }
      
      // Reset translation with spring animation
      translateX.value = withSpring(0, {
        damping: 20,
        stiffness: 90,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    // Add subtle color change based on swipe direction
    const backgroundColor = interpolateColor(
      translateX.value,
      [-100, 0, 100],
      ['rgba(229, 9, 20, 0.1)', 'rgba(0, 0, 0, 0)', 'rgba(229, 9, 20, 0.1)']
    );

    return {
      transform: [{ translateX: translateX.value }],
      backgroundColor,
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[{ flex: 1 }, animatedStyle]}>
          {children}
          <SwipeEdgeIndicator translateX={translateX} side="left" />
          <SwipeEdgeIndicator translateX={translateX} side="right" />
          <TabPositionIndicator />
          <SwipeIndicator 
            visible={showIndicator} 
            onComplete={markIndicatorAsSeen}
          />
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
