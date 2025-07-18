import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import BooksScreen from "../screens/BooksScreen";
import CartScreen from "../screens/CartScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { Ionicons } from '@expo/vector-icons';
import { CartProvider } from "../context/CartContext";
import LoginScreen from "../screens/LoginScreen";
import RestoreScreen from "../screens/RestoreScreen";
import OrderBooksScreen from "../screens/OrderBooksScreen";
import { Text } from 'react-native';




const Stack = createStackNavigator()

function MyStack() {

    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Restore" component={RestoreScreen} />
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
                    } else if (route.name === 'OrderBooks') {
                        iconName = focused ? 'clipboard' : 'clipboard-outline';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName as any} size={size} color={color} />;
                },
                headerTintColor: '#2a2233ff',
                tabBarActiveTintColor: '#a78bfa',
                tabBarInactiveTintColor: '#8a7c99ff',
                headerStyle:{backgroundColor:'#f3e8ff'},
                tabBarStyle: {
                    backgroundColor: '#f3e8ff',
                    borderTopWidth: 0.5,
                    borderTopColor: '#e5d9f2',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Book" component={BooksScreen} options={{ title: 'Libros' }} />
            <Tab.Screen name="Cart" component={CartScreen} options={{ title: 'Carrito' }} />
            <Tab.Screen name="OrderBooks" component={OrderBooksScreen} options={{ title: 'Órdenes' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
        </Tab.Navigator>
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