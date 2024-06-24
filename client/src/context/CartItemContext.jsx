// src/context/CartItemContext.js
import React, { createContext, useState, useEffect } from 'react';

const CartItemContext = createContext();

export const CartItemProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        // 로컬 스토리지에서 장바구니 아이템 데이터를 초기화
        const savedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setItems(savedItems);
    }, []);

    useEffect(() => {
        // 아이템이 변경될 때 로컬 스토리지에 저장
        localStorage.setItem('cartItems', JSON.stringify(items));
    }, [items]);

    const addToCart = (item) => {
        const existingItemIndex = items.findIndex(existingItem => existingItem.name === item.name);

        if (existingItemIndex !== -1) {
            const updatedItems = [...items];
            updatedItems[existingItemIndex].quantity += item.quantity;
            setItems(updatedItems);
        } else {
            setItems(prevItems => [...prevItems, item]);
        }
    };

    const removeItem = (itemName) => {
        setItems(items.filter(item => item.name !== itemName));
    };

    const updateQuantity = (itemName, newQuantity) => {
        setItems(items.map(item =>
            item.name === itemName ? { ...item, quantity: newQuantity } : item
        ));
    };

    const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const contextValue = {
        items,
        setItems,
        addToCart,
        removeItem,
        updateQuantity,
        totalPrice,
    };

    return (
        <CartItemContext.Provider value={contextValue}>
            {children}
        </CartItemContext.Provider>
    );
};

export default CartItemContext;
