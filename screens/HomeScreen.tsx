import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function HomeScreen() {
    return (

         <ImageBackground
                style={styles.container}
            source={{uri :"https://images.pexels.com/photos/1287142/pexels-photo-1287142.jpeg"}}
            
             >  
        <View>
            <Text style={styles.title}>HomeScreen en proceso continuar a libros</Text>
        </View>

</ImageBackground>

    )
}

const styles = StyleSheet.create({



     container: {
        flex: 1,
        backgroundColor: '#E5DEF8',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },

     title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#251554',
        textAlign: 'center'
        
    },

})