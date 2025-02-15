import React, { useState } from 'react';
import '../styles/Navbar.css';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice.js';
import { logout } from '../slices/authSlice.js';

const WebNav = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();
  const [expanded, setExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const logouthandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <Navbar expand="lg" className="navbar" variant="light" expanded={expanded}>
      <Container>
        {/* Left - Logo */}
        <Navbar.Brand className="navbar-brand" href="/" style={{ marginLeft: '10px' }}>
          <span className="logo-icon">🛍️</span> Ours STORE
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setExpanded(expanded ? false : true)} />

        <Navbar.Collapse>
          {/* Center - Navigation Links */}
          <Nav className=" navbar-links">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <NavDropdown.Item onClick={() => navigate('/profile')}>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logouthandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link href="/login">Login</Nav.Link>
            )}
            <Nav.Link href="/cart">
              <FaShoppingCart /> Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.reduce((a, c) => a + c.qty, 0)}</span>
              )}
            </Nav.Link>
            {userInfo && userInfo.isAdmin && (

              <NavDropdown title='Admin' id='adminmenu'>
                <NavDropdown.Item onClick={() => { navigate('/admin/product'); }}>
                  Product
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate('/admin/user'); }}>
                  Users
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => { navigate('/admin/order'); }}>
                  Order
                </NavDropdown.Item>

              </NavDropdown>
            )}
          </Nav>

          {/* Right - Search, Login, Cart */}
          {/* Search Box */}
          <Form className="d-flex search-form ms-auto" onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search products..."
              className="me-2 search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="outline-dark" className="search-btn">
              <FaSearch />
            </Button>
          </Form>


        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default WebNav;
