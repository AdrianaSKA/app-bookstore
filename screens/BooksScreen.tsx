import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/Config';
import { useCart } from '../context/CartContext';

import { AudioPlayer, useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/btninicio.mp3');
const audioAlert = require('../assets/audio/alertas.mp3');

export default function BooksScreen() {
 const player = useAudioPlayer(audioSource);
    const alertsnd= useAudioPlayer(audioAlert);


  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();
  const [categoria, setCategoria] = useState<string>('Todos');


  const fetchBooks = async () => {
    setLoading(true);

    try {
      let q;
      if (categoria === 'Todos') {
        q = collection(db, "books");
      } else {
        q = query(collection(db, "books"), where("genre", "==", categoria));
      }

      const querySnapshot = await getDocs(q);
      const booksList: Book[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        booksList.push({
          id: data.id ?? '',
          title: data.title ?? '',
          genre: data.genre ?? '',
          description: data.description ?? '',
          pages: data.pages ?? '',
          coverUrl: data.coverUrl ?? ''
        });
      });

      setBooks(booksList);
    } catch (error) {
      console.error("Error al obtener los libros: ", error);
    }

    setLoading(false);
  };


  useEffect(() => {
    fetchBooks();
  }, [categoria]);

  type Book = {
    id: string;
    title: string;
    genre: string;
    description: string;
    pages: string;
    coverUrl: string;
  };


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7D64C3" />
        <Text style={{ color: '#555', marginTop: 10 }}>Cargando libros...</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.tabContainer}>
        {['Todos', 'Romance', 'Misterio', 'Ciencia Ficción', 'Terror'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.tabButton,
              categoria === cat && styles.tabButtonSelected
            ]}
            onPress={() => setCategoria(cat)}
          >
            <Text style={categoria === cat ? styles.tabTextSelected : styles.tabText}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.coverUrl }} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.genre}>{item.genre}</Text>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.pages}>Páginas: {item.pages}</Text>

            <TouchableOpacity style={styles.button} onPress={() =>{ 
              
              player.seekTo(0);
              player.play();
              addToCart(item)}}>
              <Text style={styles.buttonText}>Añadir al carrito</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
    backgroundColor: 'rgba(0,0,0,0.35)',
    zIndex: 0,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
    zIndex: 1,
  },
  card: {
    backgroundColor: '#CABCEF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#251554',
    marginBottom: 8,
  },
  genre: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#444',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  pages: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#7D64C3',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 10
  },
  tabButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#eee',
    borderRadius: 20
  },
  tabButtonSelected: {
    backgroundColor: '#7D64C3'
  },
  tabText: {
    color: '#333'
  },
  tabTextSelected: {
    color: '#fff',
    fontWeight: 'bold'
  }
});

