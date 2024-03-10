import React from 'react';
import { useCartsContext } from '../contexts/cart/useCartsContext';
import deleteIcon from '../assets/images/delete.svg';
import { Link } from 'react-router-dom';

export const Korzina: React.FC = () => {
    const { cartItems, removeFromCart } = useCartsContext();

    const handleRemoveFromCart = (productId: number) => {
        removeFromCart(productId);
    };

    return (
        <div className='container'>
            <h1>Basket</h1>
            <Link to='/'><button type="button" className="btn btn-primary btn-lg">Go Home</button></Link>
            {cartItems.length === 0 ? (
                <div className="flex2">
                    <p>Your basket is empty.</p>
                </div>
            ) : (
                <ul>
                    {cartItems.map((item, index) => (
                        <li key={index}>
                            <h2>{item.product.title}</h2>
                            <p>Description: {item.product.description}</p>
                            <p>Price: ${item.product.price}</p>
                            <p>Quantity: {item.quantity}</p>
                            <img src={item.product.thumbnail} alt="" />
                            <button onClick={() => handleRemoveFromCart(item.product.id)} className='delete'> <img src={deleteIcon} alt="" /> </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
};
