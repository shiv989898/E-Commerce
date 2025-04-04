import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useLocalSearchParams } from "expo-router";
import { WishlistContext } from "./_layout";

interface Product {
  id: number;
  name?: string;
  title?: string;
  description: string;
  price: number;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
}

export default function WishlistScreen() {
  const params = useLocalSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const { wishlist } = useContext(WishlistContext);

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

  const wishlistItems = products.filter((item) => wishlist.includes(item.id));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Wishlist</Text>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: "#888",
  },
});
