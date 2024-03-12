import React, { createContext, useContext, useEffect, useState } from 'react';
import { Product } from '../../services/types/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartsContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
}

export const CartsContext = createContext<CartsContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {}
});

export const useCartsContext = () => useContext(CartsContext);

export const CartsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const saveCartItemsToLocalStorage = (items: CartItem[]) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const addToCart = (product: Product) => {
    const existingCartItem = cartItems.find(item => item.product.id === product.id);

    if (existingCartItem) {
      setCartItems(prevCartItems => {
        const updatedCartItems = prevCartItems.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        saveCartItemsToLocalStorage(updatedCartItems);
        return updatedCartItems;
      });
    } else {
      const newCartItem: CartItem = { product, quantity: 1 };
      const updatedCartItems = [...cartItems, newCartItem];
      setCartItems(updatedCartItems);
      saveCartItemsToLocalStorage(updatedCartItems);
    }
  };

  const removeFromCart = (productId: number) => {
    const updatedCartItems = cartItems.filter(item => item.product.id !== productId);
    setCartItems(updatedCartItems);
    saveCartItemsToLocalStorage(updatedCartItems);
  };

  return (
    <CartsContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartsContext.Provider>
  );
};
