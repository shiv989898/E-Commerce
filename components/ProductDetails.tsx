import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Button } from "react-native";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export default function ProductDetails({
  product,
  onBack,
  onAddToCart,
}: {
  product: Product;
  onBack: () => void;
  onAddToCart: () => void;
}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="← Back" onPress={onBack} />
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="Add to Cart" onPress={onAddToCart} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "center" },
  image: { width: 200, height: 200, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 8 },
  price: { fontSize: 16, color: "#444", marginBottom: 8 },
  category: { fontSize: 14, color: "#888", marginBottom: 8 },
  description: { textAlign: "center", marginBottom: 16 },
});
