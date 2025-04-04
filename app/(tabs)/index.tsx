import {
	Image,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	Dimensions,
	SafeAreaView,
	TextInput,
  } from "react-native";
  import { useEffect, useState } from "react";
  import { Feather } from "@expo/vector-icons";
  import { WishlistContext } from "./_layout";
  import { useContext } from "react";
  import { useCart } from "@/context/CartContext";
  import { Picker } from "@react-native-picker/picker";
  
  interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	category: string;
	image: string;
	rating: {
	  rate: number;
	  count: number;
	};
  }
  
  const { width } = Dimensions.get("window");
  const cardWidth = width / 2 - 24;
  
  export default function HomeScreen() {
	const [products, setProducts] = useState<Product[]>([]);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState("All");
	const [sort, setSort] = useState("default");
	const [ratingFilter, setRatingFilter] = useState(0);
	const [priceRange, setPriceRange] = useState([0, 1000]);
  
	const { wishlist, toggleWishlist } = useContext(WishlistContext);
	const { addToCart } = useCart();
  
	useEffect(() => {
	  (async () => {
		try {
		  const response = await fetch("https://fakestoreapi.com/products");
		  const data = await response.json();
		  setProducts(data);
		} catch (error) {
		  console.error("Error fetching products:", error);
		}
	  })();
	}, []);
  
	const uniqueCategories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
	const filteredProducts = products
	  .filter(
		(item) =>
		  item.title.toLowerCase().includes(search.toLowerCase()) &&
		  (category === "All" || item.category === category) &&
		  item.rating.rate >= ratingFilter &&
		  item.price >= priceRange[0] &&
		  item.price <= priceRange[1]
	  )
	  .sort((a, b) => {
		if (sort === "lowToHigh") return a.price - b.price;
		if (sort === "highToLow") return b.price - a.price;
		return 0;
	  });
  
	const renderProductCard = ({ item }: { item: Product }) => {
	  const isWishlisted = wishlist.includes(item.id);
  
	  return (
		<TouchableOpacity
		  onPress={() => setSelectedProduct(item)}
		  style={styles.cardContainer}
		  activeOpacity={0.9}
		>
		  <View style={styles.imageContainer}>
			<Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
			<TouchableOpacity onPress={() => toggleWishlist(item.id)} style={styles.heartIcon}>
			  <Feather name="heart" size={20} color={isWishlisted ? "red" : "gray"} />
			</TouchableOpacity>
		  </View>
		  <View style={styles.cardContent}>
			<Text style={styles.productCategory}>{item.category}</Text>
			<Text numberOfLines={2} style={styles.productTitle}>{item.title}</Text>
			<View style={styles.productFooter}>
			  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
			  <Text style={styles.ratingText}>⭐ {item.rating.rate}</Text>
			</View>
		  </View>
		</TouchableOpacity>
	  );
	};
  
	const renderDetails = () => {
	  if (!selectedProduct) return null;
	  return (
		<View style={styles.detailsContainer}>
		  <TouchableOpacity onPress={() => setSelectedProduct(null)}>
			<Text style={styles.backButton}>← Back</Text>
		  </TouchableOpacity>
		  <Image source={{ uri: selectedProduct.image }} style={styles.detailsImage} />
		  <Text style={styles.detailsTitle}>{selectedProduct.title}</Text>
		  <Text style={styles.detailsPrice}>${selectedProduct.price.toFixed(2)}</Text>
		  <Text style={styles.detailsCategory}>{selectedProduct.category}</Text>
		  <Text style={styles.detailsDescription}>{selectedProduct.description}</Text>
		  <TouchableOpacity
			onPress={() => {
			  addToCart(selectedProduct);
			  alert("Added to cart");
			}}
			style={styles.addToCartButton}
		  >
			<Text style={styles.addToCartText}>Add to Cart</Text>
		  </TouchableOpacity>
		</View>
	  );
	};
  
	return (
	  <SafeAreaView style={styles.container}>
		{selectedProduct ? (
		  renderDetails()
		) : (
		  <>
			<Text style={styles.headerTitle}>Featured Products</Text>
  
			<TextInput
			  style={styles.searchInput}
			  placeholder="Search products..."
			  value={search}
			  onChangeText={setSearch}
			/>
  
			<View style={styles.filterRow}>
			  <Picker
				selectedValue={category}
				onValueChange={(itemValue) => setCategory(itemValue)}
				style={styles.picker}
			  >
				{uniqueCategories.map((cat) => (
				  <Picker.Item key={cat} label={cat} value={cat} />
				))}
			  </Picker>
  
			  <Picker
				selectedValue={sort}
				onValueChange={(value) => setSort(value)}
				style={styles.picker}
			  >
				<Picker.Item label="Default" value="default" />
				<Picker.Item label="Low to High" value="lowToHigh" />
				<Picker.Item label="High to Low" value="highToLow" />
			  </Picker>
  
			  <Picker
				selectedValue={ratingFilter}
				onValueChange={(value) => setRatingFilter(value)}
				style={styles.picker}
			  >
				<Picker.Item label="All ratings" value={0} />
				<Picker.Item label="4 & up" value={4} />
				<Picker.Item label="3 & up" value={3} />
			  </Picker>
			</View>
  
			<FlatList
			  data={filteredProducts}
			  renderItem={renderProductCard}
			  keyExtractor={(item) => item.id.toString()}
			  numColumns={2}
			  contentContainerStyle={styles.productGrid}
			  columnWrapperStyle={styles.columnWrapper}
			  showsVerticalScrollIndicator={false}
			/>
		  </>
		)}
	  </SafeAreaView>
	);
  }
  
  const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: "#fff",
	  paddingTop: 45,
	},
	headerTitle: {
	  fontSize: 24,
	  fontWeight: "700",
	  marginTop: 8,
	  marginHorizontal: 16,
	  marginBottom: 8,
	},
	searchInput: {
	  marginHorizontal: 16,
	  marginBottom: 8,
	  padding: 8,
	  borderWidth: 1,
	  borderColor: "#ccc",
	  borderRadius: 50,
	},
	filterRow: {
	  flexDirection: "row",
	  justifyContent: "space-between",
	  paddingHorizontal: 1,
	  marginBottom: 20,
	},
	picker: {
	  flex: 1,
	  height: 50,
	  marginHorizontal: 1,
	},
	productGrid: {
	  paddingHorizontal: 12,
	  paddingBottom: 20,
	},
	columnWrapper: {
	  justifyContent: "space-between",
	  gap: 16,
	},
	cardContainer: {
	  width: cardWidth,
	  backgroundColor: "#fff",
	  borderRadius: 16,
	  overflow: "hidden",
	  marginBottom: 16,
	  elevation: 2,
	  shadowColor: "#000",
	  shadowOffset: { width: 0, height: 1 },
	  shadowOpacity: 0.1,
	  shadowRadius: 2,
	},
	imageContainer: {
	  height: 150,
	  backgroundColor: "#f9f9f9",
	  justifyContent: "center",
	  alignItems: "center",
	  paddingVertical: 12,
	  position: "relative",
	},
	productImage: {
	  width: "80%",
	  height: "80%",
	},
	heartIcon: {
	  position: "absolute",
	  top: 8,
	  right: 8,
	  backgroundColor: "#fff",
	  padding: 6,
	  borderRadius: 20,
	  elevation: 3,
	  zIndex: 1,
	},
	cardContent: {
	  padding: 12,
	},
	productCategory: {
	  fontSize: 12,
	  color: "#777",
	  textTransform: "uppercase",
	  marginBottom: 4,
	},
	productTitle: {
	  fontSize: 12,
	  fontWeight: "500",
	  marginBottom: 8,
	  height: 36,
	  lineHeight: 18,
	},
	productFooter: {
	  flexDirection: "row",
	  justifyContent: "space-between",
	  alignItems: "center",
	  marginTop: 4,
	},
	productPrice: {
	  fontSize: 16,
	  fontWeight: "700",
	  color: "#222",
	},
	ratingText: {
	  fontSize: 12,
	  fontWeight: "600",
	},
	detailsContainer: {
	  padding: 16,
	  alignItems: "center",
	},
	detailsImage: {
	  width: 200,
	  height: 200,
	  marginBottom: 16,
	},
	detailsTitle: {
	  fontSize: 20,
	  fontWeight: "bold",
	  marginBottom: 8,
	  textAlign: "center",
	},
	detailsPrice: {
	  fontSize: 18,
	  color: "#444",
	  marginBottom: 8,
	},
	detailsCategory: {
	  fontSize: 14,
	  color: "#888",
	  marginBottom: 8,
	},
	detailsDescription: {
	  textAlign: "center",
	  marginBottom: 16,
	},
	addToCartButton: {
	  backgroundColor: "tomato",
	  paddingVertical: 12,
	  paddingHorizontal: 24,
	  borderRadius: 8,
	},
	addToCartText: {
	  color: "#fff",
	  fontWeight: "bold",
	},
	backButton: {
	  fontSize: 20,
	  color: "tomato",
	  alignSelf: "flex-start",
	  marginBottom: 12,
	},
  });