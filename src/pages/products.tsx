import React, { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "../services/types/types";
import { Link } from "react-router-dom";
import { useCartsContext } from "../contexts/cart/useCartsContext";
import "bootstrap/dist/css/bootstrap.min.css";

export const Products: React.FC = () => {
  const { addToCart } = useCartsContext();
  const [searchValue, setSearchValue] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);

  const fetchProducts = async (searchQuery: string) => {
    try {
      if (searchQuery.trim() !== "") {
        const response = await axios.get<{ products: Product[] }>(
          `https://dummyjson.com/products/search?q=${searchQuery}`
        );
        setProducts(response.data.products);
        setSearchedProduct(null);
      } else {
        const response = await axios.get<{ products: Product[] }>(
          "https://dummyjson.com/products"
        );
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
      setSearchedProduct(null);
    }
  };

  useEffect(() => {
    fetchProducts(searchValue);
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <div className="container">
      <Link to="/">
        <button type="button" className="button-back">
          Go Home
        </button>
      </Link>
      <div className="products">
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
            <button className="search__button">
            </button>
          </div>
          {searchedProduct ? (
            <div>
              <button onClick={() => handleAddToCart(searchedProduct)}>
                <svg
                  className="fill"
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.81655 5.48063L0 1.66525L1.66525 0L5.48063 3.81655H23.4183C23.6017 3.81654 23.7826 3.85941 23.9466 3.94173C24.1105 4.02406 24.2529 4.14356 24.3624 4.2907C24.4719 4.43785 24.5456 4.60856 24.5774 4.78921C24.6092 4.96986 24.5984 5.15545 24.5457 5.33117L21.7213 14.746C21.6486 14.9886 21.4997 15.2012 21.2966 15.3524C21.0935 15.5035 20.847 15.5852 20.5938 15.5851H6.17027V17.9389H19.1157V20.2926H4.99341C4.68129 20.2926 4.38195 20.1686 4.16125 19.9479C3.94054 19.7272 3.81655 19.4278 3.81655 19.1157V5.48063ZM6.17027 6.17027V13.2314H19.7183L21.8366 6.17027H6.17027ZM5.58184 25C5.11366 25 4.66465 24.814 4.33359 24.483C4.00254 24.1519 3.81655 23.7029 3.81655 23.2347C3.81655 22.7665 4.00254 22.3175 4.33359 21.9865C4.66465 21.6554 5.11366 21.4694 5.58184 21.4694C6.05002 21.4694 6.49903 21.6554 6.83009 21.9865C7.16114 22.3175 7.34713 22.7665 7.34713 23.2347C7.34713 23.7029 7.16114 24.1519 6.83009 24.483C6.49903 24.814 6.05002 25 5.58184 25ZM19.7041 25C19.236 25 18.7869 24.814 18.4559 24.483C18.1248 24.1519 17.9388 23.7029 17.9388 23.2347C17.9388 22.7665 18.1248 22.3175 18.4559 21.9865C18.7869 21.6554 19.236 21.4694 19.7041 21.4694C20.1723 21.4694 20.6213 21.6554 20.9524 21.9865C21.2834 22.3175 21.4694 22.7665 21.4694 23.2347C21.4694 23.7029 21.2834 24.1519 20.9524 24.483C20.6213 24.814 20.1723 25 19.7041 25Z"
                    fill="white !important"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <ul className="products-grid">
              {products.length === 0 ? (
                <div className="" style={{ height: "100px" }}>
                  <div
                    className="spinner-border text-primary"
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
                        className="c-button"
                        onClick={() => handleAddToCart(product)}
                      >
                        <span className="c-main">
                          <span className="c-ico">
                            <span className="c-blur"></span>{" "}
                            <span className="ico-text">+</span>
                          </span>
                          Add to Cart
                        </span>
                      </button>
                    </li>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};
