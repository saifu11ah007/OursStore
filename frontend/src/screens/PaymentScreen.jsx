import React, {  useEffect } from "react";
import "../styles/PaymentScreen.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCreateOrderMutation } from "../slices/ordersApiSlice.js";
import { stripePromise } from "../utils/stripe";

const PaymentScreen = () => {
  const navigate = useNavigate();

  
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, itemPrice, shippingPrice, taxPrice, totalPrice } = cart;
  const [createOrder] = useCreateOrderMutation();

  useEffect(() => {
    if (!shippingAddress || Object.keys(shippingAddress).length === 0) {
      navigate("/checkout");
    }
  }, [shippingAddress, navigate]);

  // **Handle Stripe Payment (Creates Order First)**
  const handleStripePayment = async () => {
    try {
        // First, create an order before payment
        const orderResponse = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: "Card",
            itemsPrice: itemPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
            user: cart.userInfo?._id,
        }).unwrap();

        const orderId = orderResponse._id; // Get order ID from response

        // Now proceed to Stripe payment
        const response = await fetch("https://ours-store-backend.vercel.app/api/payment/create-checkout-session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                cartItems: cart.cartItems, 
                orderId, 
                taxPrice,      // ✅ Include tax
                shippingPrice, // ✅ Include shipping
            }),
            credentials: "include", 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const session = await response.json();
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });

        if (error) {
            console.error("Stripe Checkout Error:", error);
        }
    } catch (error) {
        console.error("Error in Stripe Payment:", error);
        alert("Payment failed!");
    }
};




  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <a href="/">Back to shop</a>
        <span className="checkout-logo">🛍️</span>
      </div>
      <div className="checkout-progress">
        <span>✔ Shopping bag</span>
        <span>✔ Order details</span>
        <span className="checkout-current-step">
          <span className="checkout-step">3</span> Payment
        </span>
      </div>
      <div className="checkout-content">
        <div className="checkout-payment-section">
          <h2>Payment</h2>
          <div className="checkout-payment-icons">
            <img src="https://img.icons8.com/color/48/000000/visa.png" alt="Visa" />
            <img src="https://img.icons8.com/color/48/000000/mastercard-logo.png" alt="Mastercard" />
            <img src="https://img.icons8.com/color/48/000000/maestro.png" alt="Maestro" />
          </div>
          <Form>
            <Form.Group>
              <Form.Check
                type="radio"
                className="my-2"
                label="PayPal or Credit Card"
                id="Paypal"
                name="paymentMethod"
                value={"PayPal"}
                checked
                readOnly
              />
            </Form.Group>
            <label>Cardholder's Name</label>
            <input type="text" placeholder="Linda Williams" />
            <label>Card Number</label>
            <input type="text" placeholder="0125 6780 4567 9909" />
            <div className="checkout-form-row">
              <div className="checkout-form-col">
                <label>Expiry Date</label>
                <input type="text" placeholder="YY/MM" />
              </div>
              <div className="checkout-form-col">
                <label>CVV</label>
                <input type="text" className="checkout-cvv" />
              </div>
            </div>
          </Form>
        </div>
        <div className="checkout-summary-section">
          <h2>Order Summary</h2>
          <p>{cart.cartItems.length} items</p>
          {cart.cartItems.length > 0 ? (
            cart.cartItems.map((item, index) => (
              <div key={index} className="checkout-item">
                <img src={item.image} alt={item.name} />
                <div>
                  <strong>Rs. {item.price}</strong>
                  <p>{item.name}</p>
                  <p>Qty: {item.qty}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in the cart.</p>
          )}
          <hr />
          <div className="checkout-summary-details">
            <p>Subtotal <span>Rs. {itemPrice}</span></p>
            <p>Delivery <span>{shippingPrice === 0 ? "Free" : `Rs. ${shippingPrice}`}</span></p>
            <p><strong>Total to Pay</strong> <span><strong>Rs. {totalPrice}</strong></span></p>
          </div>
          <button className="checkout-btn" onClick={handleStripePayment}>
            Pay with Card
          </button>
          <p className="checkout-footer">Complimentary Shipping & Returns</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
