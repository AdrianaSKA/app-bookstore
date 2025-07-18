import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground, StyleSheet } from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/Config';
import { onAuthStateChanged } from 'firebase/auth';
import { useFocusEffect } from '@react-navigation/native';


export default function OrderBooksScreen() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPedidos = async (uid: string) => {
        try {
            const pedidosQuery = query(collection(db, 'pedidos'), where('userId', '==', uid));
            const querySnapshot = await getDocs(pedidosQuery);
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(data);
        } catch (error) {
            console.error('Error al obtener pedidos:', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                    fetchPedidos(user.uid);
                } else {
                    setLoading(false);
                }
            });

            return () => unsubscribe();
        }, [])
    );

    return (
        <ImageBackground
            source={{ uri: 'https://images.pexels.com/photos/10584999/pexels-photo-10584999.jpeg' }}
            style={styles.background}
            imageStyle={styles.backgroundImage}
        >
            <View style={styles.overlay} />
            {loading ? (
                <Text style={styles.title}>Cargando pedidos...</Text>
            ) : orders.length === 0 ? (
                <Text style={styles.title}>No tienes pedidos aún.</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.title}>📦 Pedido Nº {item.numeroPedido || '---'}</Text>

                            <View style={styles.separator} />

                            {item.libros.map((libro: any, index: number) => (
                                <View key={index} style={styles.bookRow}>
                                    <Text style={styles.bullet}>•</Text>
                                    <Text style={styles.bookItem}>{libro.title}</Text>
                                </View>
                            ))}

                            <View style={styles.separator} />

                            <Text style={[styles.status, item.entregado ? styles.entregado : styles.pendiente]}>
                                {item.entregado ? '✅ Entregado' : '⏳ Pendiente'}
                            </Text>
                        </View>
                    )}
                />
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        position: 'relative',
    },
    backgroundImage: {
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 0,
    },
    listContainer: {
        padding: 16,
        paddingBottom: 30,
        zIndex: 1,
    },
    card: {
        backgroundColor: '#d0c4eeff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#7D64C3',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 6,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#2c1f3fff',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#3D2A73',
        marginBottom: 8,
    },
    bookItem: {
        marginBottom: 4,
        fontSize: 15,
        color: '#2F1E4C',
        flexShrink: 1,
    },
    status: {
        marginTop: 8,
        fontWeight: 'bold',
        color: '#251554',
        fontSize: 16,
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#7D64C3',
        paddingVertical: 12,
        borderRadius: 50,
        marginTop: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    separator: {
        height: 1,
        backgroundColor: '#281541ff',
        marginVertical: 10,
        opacity: 0.6,
    },
    bookRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    bullet: {
        fontSize: 16,
        color: '#7D64C3',
        marginRight: 8,
    },
    entregado: {
        color: '#3C9A5F',
    },
    pendiente: {
        color: '#D17C00',
    },
});
