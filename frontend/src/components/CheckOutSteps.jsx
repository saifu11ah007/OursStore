import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom'; // Added BrowserRouter

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Router> {/* Wrapping the content with Router */}
      <Nav className='justify-content-center mb-4'>
        <Nav.Item>
          {step1 ? (
            <LinkContainer to={'/login'}>
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Sign In</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step2 ? (
            <LinkContainer to={'/checkout'}>
              <Nav.Link>Shipping Address</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Shipping Address</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step3 ? (
            <LinkContainer to={'/payment'}>
              <Nav.Link>Checkout</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Checkout</Nav.Link>
          )}
        </Nav.Item>
        <Nav.Item>
          {step4 ? (
            <LinkContainer to={'/placeorder'}>
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Place Order</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </Router> // Closing Router tag
  );
};

export default CheckOutSteps;
