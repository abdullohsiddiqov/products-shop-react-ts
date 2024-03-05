import React, { createContext, useContext, useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartsContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
}

const CartsContext = createContext<CartsContextType>({
  cartItems: [],
  addToCart: () => {},
});

export const useCartsContext = () => useContext(CartsContext);

export const CartsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    const existingCartItem = cartItems.find(item => item.product.id === product.id);

    if (existingCartItem) {
      setCartItems(prevCartItems => {
        return prevCartItems.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      });
    } else {
      setCartItems(prevCartItems => [...prevCartItems, { product, quantity: 1 }]);
    }
  };

  return (
    <CartsContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartsContext.Provider>
  );
};
