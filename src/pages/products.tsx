import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IEntity } from '../services/types/types';
import { Link } from 'react-router-dom';

export const Products: React.FC = () => {
    const [products, setProducts] = useState<IEntity.Product[]>([]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get<{ products: IEntity.Product[] }>('https://dummyjson.com/products');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div>
            <h1 className='products'>Products</h1>
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
                    </li>
                ))}
            </ul>
        </div>
    );
};
