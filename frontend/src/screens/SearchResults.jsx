import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Rating from '../components/Rating';
import { Card } from 'react-bootstrap';
import Loader from '../components/loader.jsx';
import '../styles/Products.css';

const SearchResults = () => {
  const { keyword } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getFullImagePath = (path) => {
    return path.startsWith('/assets/') ? `http://localhost:5000${path}` : path;
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const { data } = await axios.get(`/api/products/search/${keyword}`);
        setProducts(data);
      } catch (err) {
        setError('No products found');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [keyword]);

  return loading ? (
    <Loader />
  ) : error ? (
    <h3 className="product-title">{error}</h3>
  ) : (
    <>
     
      <div className="products">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image">
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
            <p>Rs. {product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResults;
