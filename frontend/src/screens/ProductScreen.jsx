import React from 'react';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice.js';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ReactImageGallery from 'react-image-gallery';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiShoppingBag } from 'react-icons/bi';
import "bootstrap/dist/css/bootstrap.min.css";
import "react-image-gallery/styles/css/image-gallery.css";
import Loader from '../components/loader.jsx';
import { addToCart } from '../slices/cartSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Form, Button } from 'react-bootstrap'; // Add this
import Rating from '../components/Rating.jsx';
import "../styles/productscreen.css";
export default function ProductScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: productID } = useParams();
  const { data: product, isLoading, error, refetch } = useGetProductDetailsQuery(productID);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();
  const { userInfo } = useSelector((state) => state.auth)
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const defaultSizes = [
    { size: "XS", stock: 0 },
    { size: "S", stock: 0 },
    { size: "M", stock: 0 },
    { size: "L", stock: 0 },
    { size: "XL", stock: 0 },
  ];

  const sizes = product?.sizes?.length ? product.sizes : defaultSizes;

  const selectedSizeStock = selectedSize
    ? sizes.find((size) => size.size === selectedSize)?.stock || 0
    : product?.countInStock || 0;

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const addToCartHandler = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        qty: quantity,
        price: Number(product.price),
        size: selectedSize, // Add the selected size to the cart
      })
    );
    navigate("/cart");
  };
  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === '') {
      alert("Please provide both a rating and a comment.");
      return;
    }
    try {
      await createReview({ productId: productID, rating, comment }).unwrap();
      refetch();
      setRating(0);
      setComment('');
      alert("Review submitted successfully!");
    } catch (error) {
      alert(error?.data?.message || "Failed to submit review.");
    }
  };
  return isLoading ? (
    <Loader />
  ) : error ? (
    alert({error.data.message || error.error});
    <h3 className="product-title">{error.data.message || error.error}</h3>
  ) : (
    <section className="container my-5">
      <div className="row">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0">
          <div className="border p-3 shadow-sm">
            {product.images ? (
              <ReactImageGallery
                items={product.images}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            ) : (
              <Loader />
            )}
          </div>

          <div className="border p-3 shadow-sm">
            <h2>Reviews</h2>
            {!product.reviews || product.reviews.length === 0 ? (
              <h5 className="text-muted">No reviews yet</h5>
            ) : (
              <ListGroup variant="flush">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className="border-0">
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p className="text-muted">{review.comment}</p>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            {/* Review Form */}
            <ListGroup.Item className="border-0">
              <strong>Write a review</strong>
              {loadingProductReview && <Loader />}
              {userInfo ? (
                <Form onSubmit={submitReviewHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as="select" value={rating} onChange={(e) => setRating(Number(e.target.value))}>
                      <option value="">Select...</option>
                      <option value="1">1- Poor</option>
                      <option value="2">2- Fair</option>
                      <option value="3">3- Good</option>
                      <option value="4">4- Very Good</option>
                      <option value="5">5- Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment">
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as="textarea" rows="3" value={comment} onChange={(e) => setComment(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Button disabled={loadingProductReview} type="submit" variant="primary">
                    Submit
                  </Button>
                </Form>
              ) : (
                <h6>Please <a href="/login">Login</a> to write a review</h6>
              )}
            </ListGroup.Item>
          </div>
        </div>

        <div className="col-12 col-lg-6 d-flex flex-column justify-content-between">
          <div>
            <h1 className="h4 mb-3">{product.name}</h1>
            <div className="d-flex align-items-center mb-3">
              <div className="text-warning me-2">
                &#9733; &#9733; &#9733; &#9733; &#9734;
              </div>
              <span className="small text-muted">({product.numReviews})</span>
            </div>
            <ul className="list-unstyled mb-4">
              <li>
                <strong>Availability:</strong>{" "}
                <span className={selectedSizeStock > 0 ? "text-success" : "text-danger"}>
                  {selectedSize
                    ? selectedSizeStock > 0
                      ? `In Stock`
                      : "Out of Stock"
                    : product.countInStock > 0
                      ? "In Stock"
                      : "Out of Stock"}
                </span>
              </li>
              <li><strong>Brand:</strong> {product.brand}</li>
              <li><strong>Category:</strong> {product.category}</li>
              <li><strong>SKU:</strong> {product.id}</li>
            </ul>
            <div className="mb-4">
              <h2 className="h2 text-primary">
                ${product.price}{" "}
                <small className="text-muted text-decoration-line-through">
                  ${product.previousPrice}
                </small>
              </h2>
            </div>
            <p className="text-muted mb-4">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <div className="mb-3">
              <strong>Size:</strong>
              <div className="d-flex mt-2">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`btn btn-outline-secondary btn-sm me-2 ${selectedSize === size.size ? "active" : ""
                      }`}
                    onClick={() => handleSizeClick(size.size)}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="mb-4">
              <strong>Quantity:</strong>
              <div className="d-flex mt-2 align-items-center">
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="text"
                  className="form-control mx-2 text-center"
                  value={quantity}
                  readOnly
                  style={{ width: "50px" }}
                />
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= selectedSizeStock}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="d-flex gap-3 mt-4">
            <button
              className="btn btn-primary flex-grow-1"
              disabled={selectedSizeStock === 0}
              onClick={addToCartHandler}
            >
              <BiShoppingBag className="me-2" /> Add to Cart
            </button>
            <button className="btn btn-warning flex-grow-1">
              <AiOutlineHeart className="me-2" /> Wishlist
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
