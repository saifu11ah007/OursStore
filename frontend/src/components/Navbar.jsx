import React from 'react';
import '../styles/Navbar.css';
import { Nav, Container } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
const Navbar = () => {
  return (
    <nav className="navbar" variant="dark" expand="lg" collapseOnSelect>
      <div className="navbar-brand">
        <span className="logo-icon">🛍️</span>
        Ours STORE
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#products">Products</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="navbar-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
