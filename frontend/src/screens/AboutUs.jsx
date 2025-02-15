import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../styles/AboutUs.css';
import aboutimage from '../assets/aboutimage.jpeg';
import mission from '../assets/mission.png';
const AboutUs = () => {
  return (
    <Container className="about-container">
      <Row className="text-center">
        <Col>
          <h2 className="about-title">Welcome to Ours STORE</h2>
          <p className="about-subtitle">
            Your one-stop shop for the best deals on high-quality products.
          </p>
        </Col>
      </Row>

      <Row className="about-section">
        <Col md={6} className="about-text">
          <h3>Who We Are</h3>
          <p>
            At <strong>Ours STORE</strong>, we believe shopping should be fun, easy, and hassle-free. 
            We offer a wide range of premium products at unbeatable prices, ensuring you get the 
            best value for your money.
          </p>
        </Col>
        <Col md={6} className="about-image">
          <img src={aboutimage} alt="Our Store" />
        </Col>
      </Row>

      <Row className="about-section">
        <Col md={6} className="about-image">
          <img src={mission} alt="Customer Satisfaction" />
        </Col>
        <Col md={6} className="about-text">
          <h3>Our Mission</h3>
          <p>
            We are committed to providing exceptional service, high-quality products, and a seamless 
            shopping experience. Customer satisfaction is our top priority.
          </p>
        </Col>
      </Row>

      <Row className="text-center">
        <Col>
          <h3>Why Shop With Us?</h3>
        </Col>
      </Row>
      <Row className="features-section">
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <h4>🚀 Fast Delivery</h4>
              <p>We ensure quick and reliable shipping to get your orders to you on time.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <h4>💯 Quality Products</h4>
              <p>We handpick the best products to ensure top-notch quality for our customers.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="feature-card">
            <Card.Body>
              <h4>📞 24/7 Support</h4>
              <p>Our customer service team is available round-the-clock to assist you.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="about-contact">
        <Col className="text-center">
          <h3>Get in Touch</h3>
          <p>📧 Email: saif@oursstore.com | 📞 Phone: +123 456 7890</p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
