import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Product } from "../services/types/types";

const SingleProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [activeImg, setActiveImg] = useState<number | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await axios.get<Product>(
        `https://dummyjson.com/products/${id}`
      );
      setProduct(response.data);
      setActiveImg(0); // Set the first image as active by default
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchProduct();
    };

    fetchData();
  }, [id, fetchProduct]);

  const handleImageClick = (index: number) => {
    setActiveImg(index);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to="/page/products/list">
        <button type="button" className="button-back">
          Go to Products
        </button>
      </Link>
      <div className="product-details">
        <h1>{product.title}</h1>
        <div className="image-container">
          {product.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              className={`image-item ${index === 0 ? "big" : "small"}`}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
        <div className="product-info">
          <p>Description: {product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Discount Percentage: {product.discountPercentage}%</p>
          <p>Rating: {product.rating}</p>
          <p>Stock: {product.stock}</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
