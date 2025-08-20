import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter } from 'expo-router';
  import { useLocalSearchParams } from "expo-router";
  import { useEffect, useState } from "react";
import { Colors } from '@/constants/Colors';
import { AppButton } from '@/components/ui/AppButton';
  interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  }
  
  export default function ProductDetails() {
  const { id } = useLocalSearchParams();
    const [product, setProduct] = useState<Product | null>(null);
    const router = useRouter();
  const insets = useSafeAreaInsets();

  
    useEffect(() => {
      (async () => {
        try {
          // Lock this screen to portrait up
          await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        } catch {}
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await res.json();
          setProduct(data);
        } catch {}
      })();
      return () => {
        // Unlock when leaving (allow app defaults again)
        ScreenOrientation.unlockAsync().catch(() => {});
      };
    }, [id]);
  
    if (!product) return (
      <View style={styles.loadingWrap}>
        <ActivityIndicator color={Colors.light.tint} />
        <Text style={styles.loading}>Loading product...</Text>
      </View>
    );
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { top: insets.top + 10 }]} accessibilityRole="button" accessibilityLabel="Go back">
          <Feather name="chevron-left" size={22} color={Colors.light.tint} />
        </TouchableOpacity>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.productContainer}>
            <View style={styles.imageWrap}>
              <Image source={{ uri: product.image }} style={styles.image} />
            </View>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              <Text style={styles.rating}>⭐ {product.rating.rate.toFixed(1)} ({product.rating.count})</Text>
            </View>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <AppButton title="Add to Cart" onPress={() => alert('Added to cart')} />
          </View>
        </ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000' },
    scrollView: { flex: 1 },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingTop: 80,
      paddingBottom: 40,
    },
    productContainer: {
      alignItems: 'center',
      paddingHorizontal: 20,
    },
    backBtn: {
      position: 'absolute',
      left: 10,
      zIndex: 50,
      backgroundColor: 'rgba(0,0,0,0.55)',
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.4,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    imageWrap: {
      width: '100%',
      backgroundColor: '#141414',
      borderRadius: 24,
      padding: 30,
      marginBottom: 24,
      shadowColor: '#000',
      shadowOpacity: 0.5,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 10 },
      elevation: 6,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: '#262626',
    },
    image: { width: '100%', height: 260, resizeMode: 'contain' },
    title: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 14, color: '#fff' },
    metaRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 8 },
    price: { fontSize: 20, fontWeight: '700', color: Colors.light.tint },
    rating: { fontSize: 12, color: '#b3b3b3', fontWeight: '600' },
    category: { fontSize: 12, color: '#888', marginBottom: 18, textTransform: 'uppercase', letterSpacing: 1 },
  description: { textAlign: 'center', marginBottom: 32, lineHeight: 20, color: '#d0d0d0', fontSize: 14 },
    loadingWrap: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
    loading: { marginTop: 12, textAlign: 'center', fontSize: 14, color: '#fff' },
  });
  