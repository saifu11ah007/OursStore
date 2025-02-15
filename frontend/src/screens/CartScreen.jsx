import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems, itemPrice, shippingPrice, taxPrice, totalPrice } = cart;

  const addToCartHandler=async (product, qty)=>{
    dispatch(addToCart({...product, qty}));
  }
  const removeFromCartHandler=async (id)=>{
    dispatch(removeFromCart(id));
  }
  

  const handleCheckout = () => {
    navigate('/login?redirect=/checkout');
  };

  return (
    <div className="container py-5" style={{ fontFamily: 'Arial, sans-serif' }}>
      <div className="row">
        {/* Products Section */}
        <div className="col-md-8">
          <h2 className="mb-4" style={{ fontSize: '24px', fontWeight: 'bold' }}>Shopping Bag</h2>
          {cartItems.length === 0 ? (
            <p>
              Nothing in your Cart. <Link to="/">Go Back</Link>
            </p>
          ) : (
            <>
              <p>{cartItems.length} items in your bag.</p>
              <div className="card shadow-sm p-3" style={{ borderRadius: '10px' }}>
                {cartItems.map((product) => (
                  <div
                    key={`${product._id}-${product.size}`} // Unique key for each product-size combination
                    className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3"
                  >
                    <div className="d-flex align-items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="img-thumbnail me-3"
                        style={{ width: "100px", height: "100px", borderRadius: '10px' }}
                      />
                      <div>
                        <Link to={`/product/${product._id}`}>
                          <h5 className="mb-1" style={{ fontSize: '18px', fontWeight: '600' }}>
                            {product.name}
                          </h5>
                        </Link>
                        <p className="mb-1 text-muted" style={{ fontSize: '14px' }}>
                          Size: {product.size}
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="mb-1" style={{ fontSize: '16px', fontWeight: '500' }}>
                        ${product.price?.toFixed(2)}
                      </p>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => addToCartHandler(product, product.qty - 1)}
                          disabled={product.qty <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2" style={{ fontSize: '16px' }}>{product.qty}</span>
                        <button
                          className="btn btn-outline-secondary btn-sm"
                          onClick={() => addToCartHandler(product, product.qty + 1)}
                          disabled={product.qty >= product.countInStock} // Disable if quantity reaches stock limit
                        >
                          +
                        </button>
                        
                        <Button
                          type="button"
                          variant="light"
                          onClick={() =>removeFromCartHandler(product._id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>

                      <p className="mt-2 fw-bold" style={{ fontSize: '16px', color: '#FF5722' }}>
                        Total: ${(product.price * product.qty).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Summary Section */}
        <div className="col-md-4">
          <div className="card shadow-sm p-3 mb-4" style={{ borderRadius: '10px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Cart Total</h4>
            <p>Cart Subtotal: ${itemPrice}</p>
            <p>Shipping: ${shippingPrice}</p>
            <p>Tax: ${taxPrice}</p>
            <h5 className="fw-bold text-primary">Cart Total: ${totalPrice}</h5>
            <button
              className="btn btn-warning w-100 mt-3 btn-block"
              disabled={cartItems.length === 0}
              onClick={handleCheckout}
            >
              Proceed To Checkout
            </button>
          </div>

          {/* Coupon Section */}
          <div className="card shadow-sm p-3" style={{ borderRadius: '10px' }}>
            <h4 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>Coupon Code</h4>
            <p className="text-muted" style={{ fontSize: '14px' }}>
              Enter your coupon code to get a discount.
            </p>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Coupon Code"
              style={{ borderRadius: '5px' }}
            />
            <button className="btn btn-dark w-100">Apply</button>
          </div>
        </div>
      </div>

      {/* Bottom Row Section */}
      <div className="row mt-5">
        <div className="col-3">
          <div
            className="card shadow-sm p-3 text-center"
            style={{ borderRadius: '10px', backgroundColor: '#FFE9E9' }}
          >
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Free Shipping</p>
            <p style={{ fontSize: '12px', color: '#666' }}>When you spend $50+</p>
          </div>
        </div>
        <div className="col-3">
          <div
            className="card shadow-sm p-3 text-center"
            style={{ borderRadius: '10px', backgroundColor: '#FFF4E0' }}
          >
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Call Us Anytime</p>
            <p style={{ fontSize: '12px', color: '#666' }}>+34 555 5555</p>
          </div>
        </div>
        <div className="col-3">
          <div
            className="card shadow-sm p-3 text-center"
            style={{ borderRadius: '10px', backgroundColor: '#E9FFE9' }}
          >
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Chat With Us</p>
            <p style={{ fontSize: '12px', color: '#666' }}>We offer 24-hour chat support</p>
          </div>
        </div>
        <div className="col-3">
          <div
            className="card shadow-sm p-3 text-center"
            style={{ borderRadius: '10px', backgroundColor: '#E9F3FF' }}
          >
            <p style={{ fontSize: '14px', fontWeight: '600', marginBottom: '5px' }}>Gift Cards</p>
            <p style={{ fontSize: '12px', color: '#666' }}>For your loved one, in any amount</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
