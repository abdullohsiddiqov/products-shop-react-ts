import React from "react";
import { useCartsContext } from "../contexts/cart/useCartsContext";
import deleteIcon from "../assets/images/delete.svg";
import { Link } from "react-router-dom";
import Item from "antd/es/list/Item";

export const Korzina: React.FC = () => {
  const { cartItems, removeFromCart } = useCartsContext();

  const handleRemoveFromCart = (productId: number) => {
    removeFromCart(productId);
  };

  return (
    <div className="container">
      <h1>Basket</h1>
      <Link to="/">
        <button type="button" className="button-back">
          Go Home
        </button>
      </Link>
      {cartItems.length === 0 ? (
        <div className="flex2">
          <p className="error">Your basket is empty.</p>
        </div>
      ) : (
        <ul className="container-grid">
          {cartItems.map((item, index) => (
            <li key={index} className="brdr-del">
              <img src={item.product.thumbnail} alt="" />
              <h2>{item.product.title}</h2>
              <p>Description: {item.product.description}</p>
              <p>Price: ${item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button
                className="delete-button"
                onClick={() => handleRemoveFromCart(item.product.id)}
              >
                <svg className="delete-svgIcon" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
