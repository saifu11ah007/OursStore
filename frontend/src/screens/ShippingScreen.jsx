import React from "react";
import "../styles/PaymentPage.css";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice.js";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ShippingScreen = () => {
  const {userInfo }=useSelector((state)=>state.auth);
  const cart = useSelector((state) => state.cart);
  const { cartItems, itemPrice, shippingPrice, totalPrice } = cart;
  const {shippingAddress}=cart; 
  
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setCountry] = useState(shippingAddress?.country || '');

  const navigate=useNavigate();
  const dispatch=useDispatch();
  
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!address || !city || !postalCode || !country) {
      alert("Please fill out all fields before proceeding.");
      return;
    }
    dispatch(saveShippingAddress({address, city, postalCode, country}));
    navigate('/payment');
    // Handle form submission
  };

  return (
    <div className="payment-container">
      <header className="payment-header">
        <h1 className="brand-logo"><Link to={'/'}>🛍️</Link></h1>
      </header>

      <div className="payment-content">
        <div className="form-section">
          <h2 className="section-title">Shipping Details</h2>

          <Form onSubmit={submitHandler} className="shipping-form">
            <input
              type="text"
              placeholder="Full Name"
              className="form-input"
              required
              readOnly
              value={userInfo ? userInfo.name : ''}
            />
            <Form.Group controlId="address" className="form-input">
              <Form.Label >Street Address</Form.Label>
              <Form.Control type="text" placeholder="Enter Address" value={address} onChange={(e)=>setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="city" className="form-input">
              <Form.Label >City</Form.Label>
              <Form.Control type="text" placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <input
              type="text"
              placeholder="State"
              className="form-input"       
            />
            <Form.Group controlId="postalCode" className="form-input" required>
              <Form.Label >Postal Code</Form.Label>
              <Form.Control type="text" placeholder="Postal Code" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="country" className="form-input">
              <Form.Label >Country</Form.Label>
              <Form.Control type="text" placeholder="Country" value={country} onChange={(e)=>setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" className="submit-btn btn btn-warning w-100 mt-3 btn-block"> 
              Proceed to Payment
            </Button>
          </Form>
        </div>

        <div className="summary-section">
          <h2 className="section-title">Order Summary</h2>
          <h2 className="section-title">{cartItems.length} items in your cart </h2>
            
            {cartItems.map((product) => (
            <div
              key={`${product._id}-${product.size}`}
              className="order-item"
            >
              <div className="item-details">
                <h3 className="item-link">
                  <h5 className="item-name">{product.name}</h5>
                </h3>
                <p className="item-size">Size: {product.size}</p>
              </div>
              <div className="item-pricing">
                <p className="item-price">Rs. {product.price}</p>
                <p className="item-total">Total: Rs. {(product.price * product.qty)}</p>
              </div>
            </div>
          ))}

          <div className="price-summary">
            <div className="price-row">
              <span>Subtotal</span>
              <span>Rs. {itemPrice}</span>
            </div>
            <div className="price-row">
              <span>Shipping</span>
              <span>Rs. {shippingPrice}</span>
            </div>
            <div className="price-row total">
              <span>Total</span>
              <span>Rs. {totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingScreen;

