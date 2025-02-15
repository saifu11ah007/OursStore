import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import { Card, Pagination } from 'react-bootstrap';
import Loader from '../components/loader.jsx'
import '../styles/Products.css';
import { useGetProductsQuery } from '../slices/productsApiSlice.js';
import { useState } from 'react';

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const getFullImagePath = (path) => {
    return path.startsWith('/assets/') ? `http://localhost:5000${path}` : path;
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];
  const totalPages = products ? Math.ceil(products.length / productsPerPage) : 1;

  return isLoading ? (<Loader/>) : error ? (
    <h3 className="product-title">{error.data.message  || error.error}</h3>
  ) : (
    <>
      <div className="products">
        {currentProducts.map((product) => (
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
            <p>${product.price}</p>
          </div>
        ))}
      </div>
      <Pagination className="justify-content-center mt-4">
        {[...Array(totalPages).keys()].map((page) => (
          <Pagination.Item 
            key={page + 1} 
            active={page + 1 === currentPage} 
            onClick={() => setCurrentPage(page + 1)}
          >
            {page + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </>
  );
};

export default HomeScreen;
