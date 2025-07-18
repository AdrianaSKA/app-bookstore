import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { useCart } from '../context/CartContext';
import { auth, db } from '../firebase/Config';
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';

import { AudioPlayer, useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/btninicio.mp3');
const audioAlert = require('../assets/audio/alertas.mp3');


export default function CartScreen() {

   const player = useAudioPlayer(audioSource);
    const alertsnd= useAudioPlayer(audioAlert);
  const { cart, clearCart } = useCart();

  const realizarPedido = async () => {
    if (cart.length === 0) return;
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'Usuario no autenticado.');
      alertsnd.seekTo(0);
alertsnd.play();
      return;
    }

    try {

      const userDocSnap = await getDocs(query(collection(db, 'usuarios'), where('uid', '==', user.uid)));
      const userData = userDocSnap.docs[0]?.data();
      const nombre = userData?.nombre || 'Usuario desconocido';


      const pedidosSnap = await getDocs(query(collection(db, 'pedidos'), where('userId', '==', user.uid)));
      const numeroPedido = pedidosSnap.size + 1;

      await addDoc(collection(db, 'pedidos'), {
        userId: user.uid,
        nombreUsuario: nombre,
        numeroPedido: numeroPedido,
        libros: cart.map(libro => ({
          ...libro,
          estado: 'pendiente'
        })),
        fecha: serverTimestamp(),
        entregado: false
      });

      Alert.alert('Pedido realizado', 'Tu pedido fue enviado con éxito');
      player.seekTo(0);
player.play();
      clearCart();
    } catch (error) {
      console.error('Error al realizar el pedido:', error);
      Alert.alert('Error', 'No se pudo realizar el pedido');
      alertsnd.seekTo(0);
alertsnd.play();
    }
  };


  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 0,
  },
  container: {
    flex: 1,
    padding: 16,
    zIndex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
  },
  empty: {
    textAlign: 'center',
    fontSize: 16,
    color: '#eee',
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#CABCEF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#251554',
  },
  genre: {
    fontSize: 14,
    color: '#555',
  },
  pages: {
    fontSize: 12,
    color: '#666',
  },
  buyButton: {
    backgroundColor: '#7D64C3',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
