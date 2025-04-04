import { Slot } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { Feather } from "@expo/vector-icons";
import React, { createContext, useState } from "react";
import { CartProvider } from "@/context/CartContext";

// Wishlist context setup
export const WishlistContext = createContext<{
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}>({
  wishlist: [],
  toggleWishlist: () => {},
});

export default function Layout() {
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
      <CartProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "tomato",
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <Feather name="home" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="wishlist"
            options={{
              title: "Wishlist",
              tabBarIcon: ({ color, size }) => (
                <Feather name="heart" color={color} size={size} />
              ),
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              title: "Cart",
              tabBarIcon: ({ color, size }) => (
                <Feather name="shopping-bag" color={color} size={size} />
              ),
            }}
          />
          {/* ❌ Don't include `details` in the tab bar */}
          <Tabs.Screen
            name="details/[id]"
            options={{ href: null }} // Hide from tab bar
          />
        </Tabs>
      </CartProvider>
    </WishlistContext.Provider>
  );
}
