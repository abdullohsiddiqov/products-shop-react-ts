import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { IEntity } from '../services/types/types';

const SingleProduct: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<IEntity.Product | null>(null);

    const fetchProduct = async () => {
        try {
            const response = await axios.get<IEntity.Product>(`https://dummyjson.com/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product:', error);
            setProduct(null);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{product.title}</h1>
            <p>Description: {product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Discount Percentage: {product.discountPercentage}%</p>
            <p>Rating: {product.rating}</p>
            <p>Stock: {product.stock}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
            <img src={product.thumbnail} alt={product.title} />
            <div>
                {product.images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index}`} />
                ))}
            </div>
        </div>
    );
};

export default SingleProduct;
