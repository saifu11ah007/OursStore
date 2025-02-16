import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('https://ours-store-backend.vercel.app/api/products'); // Fetch data from the backend
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const getFullImagePath = (path) => {
    if (!path) {
      console.warn('Image path is undefined or null'); // Log to identify problematic products
      return '/assets/default.jpg'; // Fallback image
    }
    return path.startsWith('/assets/') ? `https://ours-store-backend.vercel.app${path}` : path;
  };
  
  return (
    <div className="products">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <div className="product-image">
            {/* Ensure image URLs are resolved properly */}
            <img src={getFullImagePath(product.image)} alt={product.name} className="default" />
            <img src={getFullImagePath(product.hoverImage)} alt={`${product.name} Hover`} className="hover" />
            <div className="product-actions">
              <Link to={`/product/${product._id}`}><button>👁 View</button></Link>
              <button>🛒 Add to Cart</button>
              <button>💳 Buy Now</button>
            </div>
          </div>
          <Link to={`/product/${product._id}`}><h3 className="product-title">{product.name}</h3></Link>
          <Card.Text>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
          </Card.Text>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
