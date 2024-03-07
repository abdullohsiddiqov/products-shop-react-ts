import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Product } from '../services/types/types';
import { Link } from 'react-router-dom';
import { useCartsContext } from '../contexts/cart/useCartsContext';
import korzinaIcon from '../assets/images/korzina.svg';

export const Products: React.FC = () => {
  const { addToCart } = useCartsContext();
  const [searchValue, setSearchValue] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [searchedProduct, setSearchedProduct] = useState<Product | null>(null);

  const fetchProducts = async (searchQuery: string) => {
    try {
      if (searchQuery.trim() !== '') {
        const response = await axios.get<{ products: Product[] }>(`https://dummyjson.com/products/search?q=${searchQuery}`);
        setProducts(response.data.products);
        setSearchedProduct(null);
      } else {
        const response = await axios.get<{ products: Product[] }>('https://dummyjson.com/products');
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
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
    <div>
      <h1 className='products'>Products</h1>
      <input 
        type="search" 
        name="" 
        id="" 
        placeholder='search...'
        value={searchValue}
        onChange={handleSearchChange}
      />
      {searchedProduct ? (
        <div>
          <button onClick={() => handleAddToCart(searchedProduct)}>
            <img src={korzinaIcon} alt="Add to Cart" />
          </button>
        </div>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link to={`/page/products/${product.id}`}>
                <h2>{product.title}</h2>
                <p>Description: {product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Discount Percentage: {product.discountPercentage}%</p>
                <p>Rating: {product.rating}</p>
                <p>Stock: {product.stock}</p>
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
                <img src={product.thumbnail} alt={product.title} />
              </Link>
              <button onClick={() => handleAddToCart(product)}>
                  <img src={korzinaIcon} alt="Add to Cart" />
                </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
