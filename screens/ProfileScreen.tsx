import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { auth, db } from '../firebase/Config';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

import { AudioPlayer, useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/btninicio.mp3');
const audioAlert = require('../assets/audio/alertas.mp3');

export default function ProfileScreen({ navigation }: any) {

  const player = useAudioPlayer(audioSource);
    const alertsnd= useAudioPlayer(audioAlert);


  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [edad, setedad] = useState(0);
  const [celular, setCelular] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data) {
          setUsuario(data.usuario);
          setCorreo(data.correo);
          setedad(data.edad);
          setCelular(data.celular);
        }
      }
    });

    return unsubscribe;
  }, []);

  function logout() {
     player.seekTo(0);
player.play();
    signOut(auth)
   
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      })
      .catch((error) => {
        console.log('Error al cerrar sesión:', error);
      });
  }

  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg" }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>Perfil</Text>

        <Text style={styles.label}>Usuario:</Text>
        <Text style={styles.value}>{usuario}</Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{correo}</Text>

        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.value}>{edad}</Text>

        <Text style={styles.label}>Celular:</Text>
        <Text style={styles.value}>{celular}</Text>

        <TouchableOpacity onPress={logout} style={styles.button}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#eee',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    color: '#fff',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#7D64C3',
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 40,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
