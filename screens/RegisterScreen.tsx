import { Alert, Button, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { auth, db } from '../firebase/Config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { AudioPlayer, useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/btninicio.mp3');
const audioAlert = require('../assets/audio/alertas.mp3');

export default function RegisterScreen({ navigation }: any) {

     const player = useAudioPlayer(audioSource);
    const alertsnd= useAudioPlayer(audioAlert);
  

  const [correo, setcorreo] = useState("");
  const [contrasenia, setcontrasenia] = useState("");
  const [usuario, setusuario] = useState("");
  const [edad, setedad] = useState(0);
  const [celular, setcelular] = useState("");

  function register() {
    if (!usuario || !correo || !celular || !edad) {
      alertsnd.seekTo(0);
     alertsnd.play();
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((userCredential) => {
        const user = userCredential.user;
        save(user.uid);
        player.seekTo(0);
        player.play();
        Alert.alert("Mensaje", "Registro exitoso");
        navigation.navigate('Login');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        Alert.alert("Error", errorMessage);
      });
  }

  async function save(uid: string) {
    await setDoc(doc(db, "usuarios", uid), {
      usuario: usuario,
      correo: correo,
      edad: edad,
      celular: celular,
    });
    console.log("Datos del usuario guardados");
  }

  return (
    <ImageBackground
      source={{ uri: "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg" }}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>Registro</Text>

        <TextInput
          placeholder='Correo electrónico'
          onChangeText={(text) => setcorreo(text)}
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          placeholder='Contraseña'
          onChangeText={(text) => setcontrasenia(text)}
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TextInput
          placeholder='Nombre de usuario'
          onChangeText={(text) => setusuario(text)}
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder='Edad'
          onChangeText={(text) => setedad(Number(text))}
          keyboardType='numeric'
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder='Celular'
          onChangeText={(text) => setcelular(text)}
          style={styles.input}
          placeholderTextColor="#999"
          keyboardType="phone-pad"
        />

        <View style={styles.buttonContainer}>
          <Button title='Registrar' onPress={register} color="#7D64C3" />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.registerText}>¿Ya tienes cuenta? <Text style={styles.registerLink}>Inicia sesión</Text></Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    width: '85%',
    zIndex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  registerText: {
    fontSize: 14,
    color: '#eee',
    textAlign: 'center',
  },
  registerLink: {
    color: '#dcd0ff',
    fontWeight: 'bold',
  },
});