// Clean single implementation
import React from 'react';
import { Tabs } from 'expo-router/tabs';
import { Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';
import { CartProvider, useCart } from '@/context/CartContext';
import { WishlistProvider, useWishlist } from '@/context/WishlistContext';

function Badge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
}

function TabNavigator() {
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#e50914',
        tabBarStyle: { backgroundColor: '#000', borderTopColor: '#181818' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Feather name="heart" color={color} size={size} />
              <Badge count={wishlist.length} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <View>
              <Feather name="shopping-bag" color={color} size={size} />
              <Badge count={cartCount} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => <Feather name="search" color={color} size={size} />,
        }}
      />
      <Tabs.Screen name="details/[id]" options={{ href: null }} />
    </Tabs>
  );
}

export default function Layout() {
  return (
    <WishlistProvider>
      <CartProvider>
        <TabNavigator />
      </CartProvider>
    </WishlistProvider>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: '#e50914',
    borderRadius: 10,
    paddingHorizontal: 5,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
});
