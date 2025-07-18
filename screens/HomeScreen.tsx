import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';

export default function HomeScreen() {
    return (
        <ImageBackground
            style={styles.container}
            source={{ uri: "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg" }}
            resizeMode="cover"
        >


            <View style={styles.content}>
                <Image
                    source={{ uri: 'https://i.pinimg.com/736x/d7/9c/0b/d79c0b94c25a07b3756c37f11337f976.jpg' }}
                    style={styles.image}
                />
                <Text style={styles.title}>Bienvenido a la Biblioteca Virtual</Text>
                <Text style={styles.subtitle}>
                    Explora una amplia colección de libros de diferentes géneros, selecciona tus favoritos y añádelos a tu carrito para leerlos cuando quieras.
                </Text>
                <Text style={styles.footer}>Selecciona "Libros" en el menú inferior para comenzar tu experiencia de lectura 📚</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#251554',
        marginBottom: 12,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: '#444',
        textAlign: 'center',
        marginBottom: 20
    },
    footer: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 20
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 30,
    }
});
