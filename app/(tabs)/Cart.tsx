import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useCart } from "../../context/CartContext";

export default function CartScreen() {
  const { cart, addToCart, removeFromCart, decreaseQuantity, getTotalPrice } = useCart();

  const renderItem = ({ item  }:any) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item.id)}
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => addToCart(item)}
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text style={styles.remove}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${getTotalPrice().toFixed(2)}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  header: {
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
  details: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
  },
  price: {
    fontSize: 14,
    color: "#888",
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityBtn: {
    backgroundColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  quantityBtnText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    marginHorizontal: 8,
    fontSize: 14,
  },
  remove: {
    fontSize: 18,
    color: "red",
    paddingLeft: 8,
  },
  totalContainer: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: "auto",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "right",
  },
});
