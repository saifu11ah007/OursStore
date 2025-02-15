import { createSlice } from "@reduxjs/toolkit";

export const addDecimal = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2); // Ensures two decimal places
};

export const updateCart = (state) => {
  // Calculate itemPrice as a number
  const itemPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty, // Use `quantity`
    0
  );

  state.itemPrice = addDecimal(itemPrice);

  // Calculate shippingPrice (free for orders > 2500)
  const shippingPrice = itemPrice > 2500 ? 0 : 250;
  state.shippingPrice = addDecimal(shippingPrice);

  // Calculate taxPrice (15% tax)
  const taxPrice = itemPrice * 0.15;
  state.taxPrice = addDecimal(taxPrice);

  // Calculate totalPrice as a number and then format it
  const totalPrice = itemPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimal(totalPrice);

  // Save updated cart to localStorage
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
