import {
	Image,
	StyleSheet,
	Text,
	FlatList,
	TouchableOpacity,
	View,
	SafeAreaView,
	StatusBar,
	TextInput,
  } from "react-native";
  import { useEffect, useState } from "react";
  import { Feather } from "@expo/vector-icons";
  import { useContext } from "react";
  import { Picker } from "@react-native-picker/picker";
  import { WishlistContext } from "./_layout";
  import { useCart } from "@/context/CartContext";
  
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
  
  export default function HomeScreen() {
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [category, setCategory] = useState("All");
	const [sort, setSort] = useState("default");
	const [ratingFilter, setRatingFilter] = useState(0);
  
	const { wishlist, toggleWishlist } = useContext(WishlistContext);
	const { addToCart } = useCart();
  
	useEffect(() => {
	  (async () => {
		try {
		  const response = await fetch("https://fakestoreapi.com/products");
		  const data = await response.json();
		  setProducts(data);
		  setFilteredProducts(data);
		} catch (error) {
		  console.error("Error fetching products:", error);
		}
	  })();
	}, []);
  
	useEffect(() => {
	  let filtered = products;
  
	  if (searchQuery) {
		filtered = filtered.filter((product) =>
		  product.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	  }
  
	  if (category !== "All") {
		filtered = filtered.filter((product) => product.category === category);
	  }
  
	  if (ratingFilter > 0) {
		filtered = filtered.filter((product) => product.rating.rate >= ratingFilter);
	  }
  
	  if (sort === "lowToHigh") {
		filtered = [...filtered].sort((a, b) => a.price - b.price);
	  } else if (sort === "highToLow") {
		filtered = [...filtered].sort((a, b) => b.price - a.price);
	  }
  
	  setFilteredProducts(filtered);
	}, [searchQuery, category, sort, ratingFilter, products]);
  
	const uniqueCategories = ["All", ...new Set(products.map((p) => p.category))];
  
	return (
	  <SafeAreaView style={styles.container}>
		<StatusBar backgroundColor="white" barStyle="dark-content" />
		<Text style={styles.headerTitle}>Featured Products</Text>
  
		{/* Search Bar */}
		<TextInput
		  style={styles.searchInput}
		  placeholder="Search products..."
		  value={searchQuery}
		  onChangeText={(text) => setSearchQuery(text)}
		/>
  
		{/* Filters with proper spacing */}
		<View style={styles.filterContainer}>
		  <View style={styles.pickerWrapper}>
			<Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
			  {uniqueCategories.map((cat) => (
				<Picker.Item key={cat} label={cat} value={cat} />
			  ))}
			</Picker>
		  </View>
  
		  <View style={styles.pickerWrapper}>
			<Picker selectedValue={sort} onValueChange={setSort} style={styles.picker}>
			  <Picker.Item label="Default" value="default" />
			  <Picker.Item label="Low to High" value="lowToHigh" />
			  <Picker.Item label="High to Low" value="highToLow" />
			</Picker>
		  </View>
  
		  <View style={styles.pickerWrapper}>
			<Picker selectedValue={ratingFilter} onValueChange={setRatingFilter} style={styles.picker}>
			  <Picker.Item label="All Ratings" value={0} />
			  <Picker.Item label="4 & up" value={4} />
			  <Picker.Item label="3 & up" value={3} />
			</Picker>
		  </View>
		</View>
  
		{/* Product List */}
		<FlatList
		  data={filteredProducts}
		  renderItem={({ item }) => (
			<TouchableOpacity style={styles.cardContainer} activeOpacity={0.9}>
			  <View style={styles.imageContainer}>
				<Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
				<TouchableOpacity onPress={() => toggleWishlist(item.id)} style={styles.heartIcon}>
				  <Feather name="heart" size={20} color={wishlist.includes(item.id) ? "red" : "gray"} />
				</TouchableOpacity>
			  </View>
			  <View style={styles.cardContent}>
				<Text style={styles.productCategory}>{item.category.toUpperCase()}</Text>
				<Text numberOfLines={2} style={styles.productTitle}>{item.title}</Text>
				<View style={styles.productFooter}>
				  <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
				  <Text style={styles.ratingText}>⭐ {item.rating.rate}</Text>
				</View>
			  </View>
			</TouchableOpacity>
		  )}
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
	  backgroundColor: "white",
	  paddingTop: 45,
	},
	headerTitle: {
	  fontSize: 24,
	  fontWeight: "700",
	  marginHorizontal: 16,
	  marginBottom: 8,
	},
	searchInput: {
	  marginHorizontal: 16,
	  marginBottom: 1,
	  padding: 10,
	  borderWidth: 1,
	  borderColor: "#ccc",
	  borderRadius: 8,
	  fontSize: 14,
	},
	filterContainer: {
	  flexDirection: "row",
	  justifyContent: "space-between",
	  alignItems: "center",
	  paddingHorizontal: 2,
	  marginBottom: 12,
	},
	pickerWrapper: {
	  flex: 1,
	  marginHorizontal: 0,
	},
	picker: {
	  width: "100%",
	  height: 80,
	},
	productGrid: {
	  paddingHorizontal: 12,
	  paddingBottom: 20,
	},
	columnWrapper: {
	  justifyContent: "space-between",
	},
	cardContainer: {
	  width: "48%",
	  backgroundColor: "#fff",
	  borderRadius: 16,
	  overflow: "hidden",
	  marginBottom: 16,
	  elevation: 3,
	  shadowColor: "#000",
	  shadowOffset: { width: 0, height: 2 },
	  shadowOpacity: 0.1,
	  shadowRadius: 4,
	},
	imageContainer: {
	  height: 150,
	  backgroundColor: "#f9f9f9",
	  justifyContent: "center",
	  alignItems: "center",
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
	  fontSize: 14,
	  fontWeight: "600",
	  marginBottom: 8,
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
  });
  
  