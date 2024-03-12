import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../services/types/types";
import { Link } from "react-router-dom";
import { useCartsContext } from "../contexts/cart/useCartsContext";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.css';
import { Toast } from 'bootstrap';
import { useAuth } from "../contexts/auth/useAuthContext";

export const Products: React.FC = () => {
  const { addToCart, cartItems } = useCartsContext();
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [toastProduct, setToastProduct] = useState<Product | null>(null);
  const [clickedButtons, setClickedButtons] = useState<string[]>([]);

  const fetchProducts = async (searchQuery: string) => {
    try {
      if (searchQuery.trim() !== "") {
        const response = await axios.get<{ products: Product[] }>(
          `https://dummyjson.com/products/search?q=${searchQuery}`
        );
        setProducts(response.data.products);
      } else {
        const response = await axios.get<{ products: Product[] }>(
          "https://dummyjson.com/products"
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  useEffect(() => {
    fetchProducts(searchValue);
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleAddToCart = (product: Product) => {
    const isProductInCart = cartItems.some(item => item.product.id === product.id);
    
    if (!isProductInCart) {
      addToCart(product);
      setToastProduct(product);
    }
  };
  
  useEffect(() => {
    if (toastProduct) {
      const toastElement = document.querySelector('.toast');
      if (toastElement instanceof Element) {
        const toast = new Toast(toastElement);
        toast.show();
      }
    }
  }, [toastProduct]);

  const handleCartButtonClick = (productId: string) => {
    if (!clickedButtons.includes(productId)) {
      setClickedButtons([...clickedButtons, productId]);
    }
  };

  const addedStatus = JSON.parse(localStorage.getItem('addedStatus') || '{}');

  return (
    <div className="">
      <Link to="/">
        <button type="button" className="button-back">
          Go Home
        </button>
      </Link>
      <div className="products">
        <div className="">
          <div className="center">
            <div className="">
              <h1>Products</h1>
              <div className="search">
                <input
                  type="text"
                  className="search__input"
                  placeholder="Type to search..."
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
          </div>
          <div className="toast-container position-fixed bottom-0 end-0 p-3">
            {toastProduct && (
              <div className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="me-auto">Product Added by {user?.name}</strong>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setToastProduct(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="toast-body">
                  {toastProduct.title} added to cart
                </div>
              </div>
            )}
          </div>
          <ul className="products-grid">
            {products.length === 0 ? (
              <div className="pos-abs" style={{ height: "100px" }}>
                <div
                  className="spinner-border"
                  role="status"
                  style={{ width: "5rem", height: "5rem" }}
                >
                  <span className="sr-only"></span>
                </div>
              </div>
            ) : (
              products.map((product) => (
                <li key={product.id} className="brdr">
                  <Link to={`/page/products/${product.id}`}>
                    <img
                      src={product.thumbnail}
                      alt={`${product.title} thumbnail`}
                      className="prod-img"
                    />
                    <h2>{product.title}</h2>
                    <p>Price: ${product.price}</p>
                    <p>Rating: {product.rating}</p>
                  </Link>
                  <li className="end">
                  <button 
                    className={`cart-button ${clickedButtons.includes(String(product.id)) ? 'clicked' : ''}`} 
                    onClick={() => { 
                      handleAddToCart(product); 
                      handleCartButtonClick(String(product.id)); 
                    }}
                  >
                    <span className="add-to-cart">{addedStatus[product.id] ? 'Added' : 'Add to cart'}</span>
                    <span className="added">Added</span>
                    <i className="fas fa-shopping-cart"></i>
                    <i className="fas fa-box"></i>
                  </button>
                  </li>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};