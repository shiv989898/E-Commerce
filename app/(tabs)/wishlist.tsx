import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

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
  const [products, setProducts] = useState<Product[]>([]);
  const { wishlist } = useWishlist();

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
      <Text style={styles.title}>Wishlist</Text>
      <FlatList
        data={wishlistItems}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={<Text style={styles.empty}>No items saved yet.</Text>}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>{item.title}</Text>
              <View style={styles.metaRow}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <View style={styles.ratingWrap}>
                  <Feather name="star" size={12} color={Colors.light.accent} />
                  <Text style={styles.ratingText}>{item.rating.rate.toFixed(1)}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16, backgroundColor: '#000' },
  title: { fontSize: 26, fontWeight: '800', marginBottom: 16, color: Colors.light.tint },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 2,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#262626',
  },
  image: { width: 70, height: 70, borderRadius: 12, marginRight: 14 },
  info: {
    flex: 1,
  },
  name: { fontSize: 14, fontWeight: '700', marginBottom: 8, color: '#fff' },
  metaRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 14, fontWeight: '600', color: Colors.light.tint },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12, fontWeight: '600', color: '#fff' },
  empty: { textAlign: 'center', marginTop: 60, color: '#777', fontSize: 15 },
});
