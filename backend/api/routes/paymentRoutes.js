import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/orderModel.js"; // ✅ Import Order model

dotenv.config();
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// **🔹 Create Stripe Checkout Session**
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems, orderId, taxPrice, shippingPrice } = req.body; // ✅ Get tax & shipping from frontend

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        ...cartItems.map((item) => ({
          price_data: {
            currency: "pkr",
            product_data: { name: `${item.name} (Size: ${item.size})`,  },
            unit_amount: item.price * 100,
          },
         
          quantity: item.qty,
        })),
        {
          // ✅ Add Tax as a separate line item
          price_data: {
            currency: "pkr",
            product_data: { name: "Tax" },
            unit_amount: Math.round(taxPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
        {
          // ✅ Add Shipping as a separate line item
          price_data: {
            currency: "pkr",
            product_data: { name: "Shipping" },
            unit_amount: Math.round(shippingPrice * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/payment-success?orderId=${orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: "http://localhost:3000/cart",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.status(500).json({ error: "Failed to create Stripe session" });
  }
});

// **🔹 Update Order After Payment**
router.post("/update-order", async (req, res) => {
    try {
        const { orderId, sessionId } = req.body;

        // Retrieve session from Stripe to verify payment
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === "paid") {
            // Update order status in database
            const order = await Order.findById(orderId);
            if (!order) {
                return res.status(404).json({ error: "Order not found" });
            }

            order.isPaid = true;
            order.paidAt = new Date();
            order.paymentResult = {
                id: session.id,
                status: session.payment_status,
                email_address: session.customer_details.email,
            };

            await order.save();

            // ✅ Send a response to clear the cart
            res.json({ message: "Order payment confirmed!", clearCart: true });
        } else {
            res.status(400).json({ error: "Payment not completed" });
        }
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ error: "Failed to update order" });
    }
});


// **🔹 Verify Payment Status**
router.get("/verify/:session_id", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.session_id);

    if (session.payment_status === "paid") {
      res.json({ success: true, message: "Payment verified" });
    } else {
      res.status(400).json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export default router;
