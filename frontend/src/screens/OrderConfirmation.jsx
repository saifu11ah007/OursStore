import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { clearCartItems } from "../slices/cartSlice";


const OrderConfirmation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const verifyPayment = async () => {
            const sessionId = searchParams.get("session_id");
            const orderId = searchParams.get("orderId");

            try {
                const response = await fetch("http://localhost:5000/api/payment/update-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId, sessionId }),
                });

                const data = await response.json();

                if (response.ok) {
                    // ✅ Clear Cart if payment was successful
                    dispatch(clearCartItems());
                    alert("Payment Successful! Your order has been placed.");
                    navigate(`/order/${orderId}`); // Redirect to order details
                } else {
                    alert(data.error || "Payment verification failed.");
                }
            } catch (error) {
                console.error("Error verifying payment:", error);
                alert("Payment verification failed.");
            }
        };

        verifyPayment();
    }, [dispatch, searchParams, navigate]);

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>🔄 Verifying Payment...</h2>
            <p>Please wait while we confirm your order.</p>
        </div>
    );
};

export default OrderConfirmation;
