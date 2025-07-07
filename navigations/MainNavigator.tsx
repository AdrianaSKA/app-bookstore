import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RomanceScreen from "../screens/categorias/RomanceScreen";
import ScienceFicScreen from "../screens/categorias/ScienceFicScreen";
import MisteryScreen from "../screens/categorias/MisteryScreen";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BooksScreen from "../screens/BooksScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from "../context/CartContext";



const Stack = createStackNavigator()

function MyStack() {

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={MyTabs} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Tab" component={MyTabs} />
        </Stack.Navigator>

    )
}

const Tab = createBottomTabNavigator()

function MyTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'help';

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Book') {
                        iconName = focused ? 'book' : 'book-outline';
                    } else if (route.name === 'Cart') {
                        iconName = focused ? 'cart' : 'cart-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#1e40af', //este es el color del icono cuando estas en la pagina. Para q puedas cambiarlo
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Book" component={LibrosTopTabs} options={{ title: "Libros" }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ title: "Carrito" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
        </Tab.Navigator>
    );
}


const Top = createMaterialTopTabNavigator();

function LibrosTopTabs() {
    return (
        <Top.Navigator>
            <Top.Screen name="Todos" component={BooksScreen} />
            <Top.Screen name="Romance" component={RomanceScreen} />
            <Top.Screen name="ScienceFic" component={ScienceFicScreen} options={{ title: "Ciencia Ficción" }} />
            <Top.Screen name="Mistery" component={MisteryScreen} options={{ title: "Misterio y Suspenso" }} />
        </Top.Navigator>
    );
}

export default function NavegadorPrincipal() {
    return (
        <CartProvider>
            <NavigationContainer>
                <MyStack />
            </NavigationContainer>
        </CartProvider>
    );
}