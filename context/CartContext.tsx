import React, { createContext, useContext, useState } from 'react';

type Book = {
    id: string;
    title: string;
    genre: string;
    description: string;
    pages: string;
    coverUrl: string;
};

type CartContextType = {
    cart: Book[];
    addToCart: (book: Book) => void;
    clearCart: () => void; 
};

const CartContext = createContext<CartContextType>({
    cart: [],
    addToCart: () => { },
    clearCart: () => { } 
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<Book[]>([]);

    const addToCart = (book: Book) => {
        setCart(prev => [...prev, book]);
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

