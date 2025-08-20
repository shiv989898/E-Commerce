import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useCart } from '@/context/CartContext';

export interface ProductCardData {
	id: number;
	title: string;
	price: number;
	image: string;
	category?: string;
	rating?: { rate: number; count: number };
}

interface Props {
	item: ProductCardData;
	onPress?: () => void;
	onToggleWishlist?: () => void;
	wishlisted?: boolean;
	compact?: boolean;
}

export const ProductCard: React.FC<Props> = ({ item, onPress, onToggleWishlist, wishlisted, compact }) => {
	const { addToCart } = useCart();
	const [loading, setLoading] = useState(true);

	return (
		<TouchableOpacity activeOpacity={0.9} style={[styles.card, compact && styles.cardCompact]} onPress={onPress}>
			<View style={styles.imageWrapper}>
				{loading && (
					<View style={styles.skeleton}>
						<ActivityIndicator color={Colors.light.tint} />
					</View>
				)}
				<Image
					source={{ uri: item.image }}
					style={styles.image}
					resizeMode="contain"
					onLoadEnd={() => setLoading(false)}
				/>
				{onToggleWishlist && (
					<TouchableOpacity style={styles.wishlistBtn} onPress={onToggleWishlist} hitSlop={10}>
						<Feather name={wishlisted ? 'heart' : 'heart'} size={18} color={wishlisted ? Colors.light.accent : Colors.light.icon} />
					</TouchableOpacity>
				)}
			</View>
			<View style={styles.content}>
				{item.category && <Text style={styles.category}>{item.category}</Text>}
				<Text numberOfLines={2} style={styles.title}>{item.title}</Text>
				<View style={styles.footer}>
					<Text style={styles.price}>${item.price.toFixed(2)}</Text>
					{item.rating && (
						<View style={styles.ratingWrap}>
							<Feather name="star" size={12} color={Colors.light.accent} />
							<Text style={styles.ratingText}>{item.rating.rate.toFixed(1)}</Text>
						</View>
					)}
				</View>
				<TouchableOpacity
					style={styles.addBtn}
					onPress={() => addToCart({ id: item.id, title: item.title, price: item.price, image: item.image })}
				>
					<Feather name="shopping-bag" size={14} color="#fff" />
					<Text style={styles.addBtnText}>Add</Text>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
		card: {
			backgroundColor: '#141414',
			borderRadius: 18,
			overflow: 'hidden',
			width: '48%',
			marginBottom: 18,
			shadowColor: '#000',
			shadowOpacity: 0.4,
			shadowRadius: 10,
			shadowOffset: { width: 0, height: 6 },
			elevation: 5,
			borderWidth: StyleSheet.hairlineWidth,
			borderColor: '#262626',
		},
	cardCompact: {
		width: '31%',
	},
		imageWrapper: {
			height: 140,
			backgroundColor: '#1e1e1e',
			alignItems: 'center',
			justifyContent: 'center',
			position: 'relative',
			padding: 8,
		},
	skeleton: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: { width: '90%', height: '90%' },
	wishlistBtn: {
		position: 'absolute',
		top: 8,
		right: 8,
		backgroundColor: '#ffffffcc',
		padding: 6,
		borderRadius: 20,
	},
	content: { padding: 12 },
		category: {
			fontSize: 10,
			textTransform: 'uppercase',
			letterSpacing: 0.5,
			color: '#888',
			marginBottom: 4,
		},
		title: { fontSize: 12, fontWeight: '600', minHeight: 34, color: '#fff' },
	footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 },
		price: { fontSize: 14, fontWeight: '700', color: Colors.light.tint },
	ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 2 },
		ratingText: { fontSize: 11, fontWeight: '600', color: '#fff' },
		addBtn: {
			marginTop: 10,
			backgroundColor: Colors.light.tint,
			paddingVertical: 8,
			borderRadius: 10,
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 6,
		},
		addBtnText: { color: '#fff', fontSize: 12, fontWeight: '600' },
});

export default ProductCard;
