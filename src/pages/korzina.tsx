import React from 'react';
import { useCartsContext } from '../contexts/cart/useCartsContext';

export const Korzina: React.FC = () => { 
    const { cartItems, removeFromCart } = useCartsContext();

    const handleRemoveFromCart = (productId: number) => {
        removeFromCart(productId);
    };

    return( 
        <div>
            <h1>Basket</h1>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index}>
                        <h2>{item.product.title}</h2>
                        <p>Description: {item.product.description}</p>
                        <p>Price: ${item.product.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <img src={item.product.thumbnail} alt="" />
                        <button onClick={() => handleRemoveFromCart(item.product.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    )
};