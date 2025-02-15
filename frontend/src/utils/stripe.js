import { loadStripe } from "@stripe/stripe-js";

// Load Stripe key from .env
const stripeApiKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

if (!stripeApiKey) {
  console.error("⚠️ Stripe API Key is missing...");
} else {
  console.log("✅ Stripe API Key Loaded:", stripeApiKey);
}

export const stripePromise = loadStripe(stripeApiKey);
