import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { db } from '../firebase/Config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function CartScreen() {
  const { cart, clearCart } = useCart();

  const realizarPedido = async () => {
    if (cart.length === 0) return;

    try {
      await addDoc(collection(db, 'pedidos'), {
        libros: cart.map(libro => ({
          ...libro,
          estado: 'pendiente'
        })),
        fecha: serverTimestamp(),
        entregado: false
      });

      Alert.alert('Pedido realizado', 'Tu pedido fue enviado con éxito');
      clearCart();
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      Alert.alert('Error', 'No se pudo realizar el pedido');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito</Text>

      {cart.length === 0 ? (
        <Text style={styles.empty}>Tu carrito está vacío.</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.coverUrl }} style={styles.image} />
                <View>
                  <Text style={styles.bookTitle}>{item.title}</Text>
                  <Text style={styles.genre}>{item.genre}</Text>
                  <Text style={styles.pages}>Páginas: {item.pages}</Text>
                </View>
              </View>
            )}
          />
          <TouchableOpacity style={styles.buyButton} onPress={realizarPedido}>
            <Text style={styles.buyButtonText}>Comprar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888'
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center'
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 5
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  genre: {
    fontSize: 14,
    color: '#555'
  },
  pages: {
    fontSize: 12,
    color: '#888'
  },
    buyButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center'
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
