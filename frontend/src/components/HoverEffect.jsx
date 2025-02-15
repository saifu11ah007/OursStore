// HoverButtons.js
import React from "react";
import '../styles/HoverButton.css';
import slider1 from '../assets/slider1.jpg'; // Replace with correct image paths
import slider2 from '../assets/slider2.png';
const HoverButtons = ({ image, title }) => (
  <div className="hover-buttons">
    <img src={image} alt={title} />
    <div className="buttons">
      <button>See</button>
      <button>Add to Cart</button>
      <button>Buy</button>
    </div>
  </div>
);

export default HoverButtons;
