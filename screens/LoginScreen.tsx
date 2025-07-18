import { StyleSheet, Text, View, TextInput, Button, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/Config';

import { AudioPlayer, useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/audio/btninicio.mp3');
const audioAlert = require('../assets/audio/alertas.mp3');



export default function LoginScreen({ navigation }: any) {

 const player = useAudioPlayer(audioSource);
    const alertsnd= useAudioPlayer(audioAlert);

    const [correo, setcorreo] = useState("");
    const [contrasenia, setcontrasenia] = useState("");

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                player.seekTo(0);
                player.play();
                Alert.alert("Mensaje", "Login exitoso");
                navigation.navigate('Tab');
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;

                console.log(errorCode);
                console.log(errorMessage);

                if (errorCode == "auth/invalid-email") {
                    errorCode = "Credenciales inválidas";
                    errorMessage = "Verificar correo y contraseña";
                } else if (errorCode == "auth/missing-password") {
                    errorCode = "Error en contraseña";
                    errorMessage = "No se reconoció la contraseña o se envió la contraseña en blanco";
                } else {
                    errorCode = "Error";
                    errorMessage = "Error en las credenciales, verificar correo y contraseña";
                }
alertsnd.seekTo(0);
alertsnd.play()
                Alert.alert(errorCode, errorMessage);
            });
    }

    return (
        <ImageBackground
            source={{ uri: "https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg" }}
            style={styles.container}
            resizeMode="cover"
        >
            <View style={styles.overlay} />
            <View style={styles.content}>
                <Text style={styles.title}>Iniciar Sesión</Text>

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

                <View style={styles.buttonContainer}>
                    <Button title='Login' onPress={login} color="#7D64C3" />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>¿Aún no tienes cuenta? <Text style={styles.registerLink}>Regístrate aquí</Text></Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
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
        marginBottom: 30,
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