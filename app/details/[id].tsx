import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    Button,
  } from "react-native";
  import { useLocalSearchParams } from "expo-router";
  import { useEffect, useState } from "react";
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

  
    useEffect(() => {
      (async () => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      })();
    }, [id]);
  
    if (!product) return <Text style={styles.loading}>Loading...</Text>;
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Button title="Add to Cart" onPress={() => alert("Added to cart")} />
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      alignItems: "center",
      
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 8,
    },
    price: {
      fontSize: 16,
      color: "#444",
      marginBottom: 8,
    },
    category: {
      fontSize: 14,
      color: "#888",
      marginBottom: 8,
    },
    description: {
      textAlign: "center",
      marginBottom: 16,
    },
    loading: {
      marginTop: 100,
      textAlign: "center",
      fontSize: 16,
    },
  });
  