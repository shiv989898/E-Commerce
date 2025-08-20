import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useCart } from '../../context/CartContext';
import { Feather } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

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
        contentContainerStyle={{ paddingBottom: 140 }}
        ListEmptyComponent={<Text style={styles.empty}>Your cart is empty.</Text>}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.totalContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal</Text>
          <Text style={styles.totalValue}>${getTotalPrice().toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutBtn} disabled={cart.length === 0}>
          <Feather name="credit-card" color="#fff" size={16} />
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, paddingHorizontal: 16, backgroundColor: '#000' },
  header: { fontSize: 26, fontWeight: '800', marginBottom: 16, color: Colors.light.tint },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#141414',
    borderRadius: 16,
    padding: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#262626',
  },
  image: { width: 70, height: 70, borderRadius: 12, marginRight: 14 },
  details: {
    flex: 1,
  },
  title: { fontSize: 14, fontWeight: '700', color: '#fff' },
  price: { fontSize: 13, color: '#b3b3b3', marginBottom: 6, fontWeight: '500' },
  quantityContainer: { flexDirection: 'row', alignItems: 'center' },
  quantityBtn: { backgroundColor: Colors.light.tint, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  quantityBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  quantityText: { marginHorizontal: 10, fontSize: 14, fontWeight: '600', color: '#fff' },
  remove: { fontSize: 18, color: '#ff4d4f', paddingLeft: 8 },
  empty: { textAlign: 'center', marginTop: 60, color: '#777', fontSize: 15 },
  totalContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: '#141414f2',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#262626',
    gap: 14,
  },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 14, color: '#b3b3b3', fontWeight: '500' },
  totalValue: { fontSize: 20, fontWeight: '800', color: Colors.light.tint },
  checkoutBtn: {
    backgroundColor: Colors.light.tint,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  checkoutText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
