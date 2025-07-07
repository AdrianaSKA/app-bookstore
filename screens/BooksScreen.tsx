import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/Config';
import { useCart } from '../context/CartContext';


type Book = {
  id: string;
  title: string;
  genre: string;
  description: string;
  pages: string;
  coverUrl: string;
};

export default function BooksScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart()

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
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
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener los libros: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  if (loading) {
    return (




      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Cargando libros...</Text>
      </View>
    );
  }



  return (
 <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}  
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
 

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

          <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
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
  },
  backgroundImage: {
    resizeMode: 'cover',       // 'contain' o 'cover' según prefieras
  },
 




  listContainer: {
    padding: 16,
    backgroundColor: '#f8f8f8'
  },
  card: {
    backgroundColor: '#CABCEF',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#7D64C3',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10
  },
   title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#251554',
  
        
    },
  genre: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 5
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5
  },
  pages: {
    fontSize: 12,
    color: '#888'
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
 button: {
        backgroundColor: '#7D64C3',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 50,
        margin: 10,
        width: 200,
        height: 50,

    },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  }

});
