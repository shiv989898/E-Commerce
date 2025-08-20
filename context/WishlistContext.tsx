import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface WishlistContextType {
	wishlist: number[];
	toggleWishlist: (id: number) => void;
	isWishlisted: (id: number) => boolean;
	clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);
const STORAGE_KEY = 'wishlist';

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
	const [wishlist, setWishlist] = useState<number[]>([]);

	// Hydrate
	useEffect(() => {
		(async () => {
			try {
				const stored = await AsyncStorage.getItem(STORAGE_KEY);
				if (stored) setWishlist(JSON.parse(stored));
			} catch (e) {
				// noop
			}
		})();
	}, []);

	// Persist
	useEffect(() => {
		AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist)).catch(() => {});
	}, [wishlist]);

	const toggleWishlist = (id: number) => {
		setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
	};

	const isWishlisted = (id: number) => wishlist.includes(id);
	const clearWishlist = () => setWishlist([]);

	return (
		<WishlistContext.Provider value={{ wishlist, toggleWishlist, isWishlisted, clearWishlist }}>
			{children}
		</WishlistContext.Provider>
	);
};

export const useWishlist = () => {
	const ctx = useContext(WishlistContext);
	if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
	return ctx;
};

export default WishlistContext;
