import { Image, StyleSheet, Text, FlatList, TouchableOpacity, View, SafeAreaView, TextInput, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import ProductCard from '@/components/ProductCard';
import FilterModal from '@/components/ui/FilterModal';
import { useRouter } from 'expo-router';

interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	category: string;
	image: string;
	rating: { rate: number; count: number };
}

export default function HomeScreen() {
	const [products, setProducts] = useState<Product[]>([]);
	const [search, setSearch] = useState('');
	const [category, setCategory] = useState('All');
	const [sort, setSort] = useState('default');
	const [ratingFilter, setRatingFilter] = useState(0);
		const [priceRange] = useState([0, 1000]);
			const [showFilters, setShowFilters] = useState(false);

	const { wishlist, toggleWishlist } = useWishlist();
	const { addToCart } = useCart();
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const response = await fetch('https://fakestoreapi.com/products');
				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error('Error fetching products:', error);
			}
		})();
	}, []);

	const uniqueCategories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

	const filteredProducts = products
		.filter(
			(item) =>
				item.title.toLowerCase().includes(search.toLowerCase()) &&
				(category === 'All' || item.category === category) &&
				item.rating.rate >= ratingFilter &&
				item.price >= priceRange[0] &&
				item.price <= priceRange[1]
		)
		.sort((a, b) => {
			if (sort === 'lowToHigh') return a.price - b.price;
			if (sort === 'highToLow') return b.price - a.price;
			return 0;
		});

	const renderProductCard = ({ item }: { item: Product }) => {
		const isWishlisted = wishlist.includes(item.id);
		return (
			<ProductCard
				item={item}
				wishlisted={isWishlisted}
				onPress={() => router.push(`/details/${item.id}`)}
				onToggleWishlist={() => toggleWishlist(item.id)}
			/>
		);
	};

		return (
			<SafeAreaView style={styles.container}>
				  <LinearGradient colors={['#000000', '#200103']} style={styles.hero}>
					<View style={styles.heroContent}>
						  <Text style={styles.heroTitle}>Find Your Style</Text>
						  <Text style={styles.heroSubtitle}>Browse curated products</Text>
										<View style={styles.searchBar}>
											<Feather name="search" size={18} color={Colors.light.placeholder} />
											<TextInput
												style={styles.searchInput}
												placeholder="Search products..."
												placeholderTextColor={Colors.light.placeholder}
												value={search}
												onChangeText={setSearch}
												returnKeyType="search"
											/>
															<TouchableOpacity
																accessibilityRole="button"
																accessibilityLabel="Open filters"
																onPress={() => setShowFilters(true)}
																style={styles.filterToggle}
															>
																<Feather name={'sliders'} size={18} color={Colors.light.tint} />
															</TouchableOpacity>
										</View>
					</View>
				</LinearGradient>
											<FilterModal
												visible={showFilters}
												onClose={() => setShowFilters(false)}
												categories={uniqueCategories}
												values={{ category, sort, rating: ratingFilter }}
												onApply={({ category: c, sort: s, rating: r }) => {
													setCategory(c);
													setSort(s);
													setRatingFilter(r);
												}}
											/>
				<FlatList
					data={filteredProducts}
					renderItem={renderProductCard}
					keyExtractor={(item) => item.id.toString()}
					numColumns={2}
					contentContainerStyle={styles.productGrid}
					columnWrapperStyle={styles.columnWrapper}
					showsVerticalScrollIndicator={false}
				/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
		container: {
			flex: 1,
			backgroundColor: '#000',
			paddingTop: Platform.select({ ios: 0, android: 0, default: 0 }),
		},
		hero: { borderBottomLeftRadius: 0, borderBottomRightRadius: 0, paddingTop: 52 },
		heroContent: { paddingHorizontal: 20, paddingBottom: 24 },
		heroTitle: { fontSize: 30, fontWeight: '800', color: Colors.light.tint, letterSpacing: 0.5 },
		heroSubtitle: { fontSize: 14, color: '#b3b3b3', marginTop: 6 },
	searchBar: {
		marginTop: 18,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#141414',
		borderRadius: 10,
		paddingHorizontal: 14,
		borderWidth: 1,
			borderColor: '#262626',
	},
		searchInput: { flex: 1, paddingVertical: 10, color: '#fff' },
				filtersWrapper: { display: 'none' },
				inlinePicker: { height: 44, color: '#ffffff' },
				pickerItem: { color: '#ffffff' },
			filterToggle: {
				padding: 8,
				borderRadius: 10,
				backgroundColor: '#1e1e1e',
				borderWidth: StyleSheet.hairlineWidth,
				borderColor: '#262626',
				marginLeft: 8,
			},
	productGrid: {
		paddingHorizontal: 14,
		paddingBottom: 40,
		paddingTop: 10,
	},
	columnWrapper: {
		justifyContent: 'space-between',
		gap: 12,
	},
});