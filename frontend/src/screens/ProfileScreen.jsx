import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useProfileMutation } from '../slices/usersApiSlice.js';
import { setCredentials } from '../slices/authSlice.js';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap'; // Correct Bootstrap Import
import '../styles/profilescreen.css';
import { Link, useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate=useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile]=useProfileMutation();
  useEffect(() => {
    if (userInfo) {
      setName(userInfo?.name || '');
      setEmail(userInfo?.email || '');
    }
  }, [userInfo]);

  const submitHandler = async(e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    else{
      try {
        const res=await updateProfile({_id:userInfo._id, name, password}).unwrap();
        dispatch(setCredentials(res));
        alert('Profile updated');
        navigate('/');
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
    console.log('Profile updated');
  };

  return (
    <Container className="mt-5">
      <Row>
        {/* Sidebar Section */}
        <Col lg={4}>
          <Card className="shadow">
            <div
              className="profile-banner"
              style={{
                height: '120px',
                backgroundImage: "url(https://bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg)",
                backgroundSize: 'cover',
              }}
            ></div>
            <Card.Body className="text-center">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="Profile"
                className="rounded-circle border"
                style={{ width: '80px', height: '80px' }}
              />
              <h5 className="mt-2">{name || 'User'}</h5>
              <p className="text-muted">Joined: February 06, 2025</p>
            </Card.Body>
            <Card.Footer className="text-center">
              <Button variant="info" size="sm">
                290 Points
              </Button>
            </Card.Footer>
          </Card>

          {/* Sidebar Links */}
          <ul className="list-group mt-4">
          <Link to={'/user-order'}>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Orders List <span className="badge bg-secondary">6</span>
            </li></Link>
            <Link to={'/profile'}>
            <li className="list-group-item active">Profile Settings</li>
            </Link>
          </ul>
        </Col>

        {/* Profile Form Section */}
        <Col lg={8}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="mb-4">Profile Settings</h4>
              <Form onSubmit={submitHandler}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" value={email} disabled />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col md={6}>
                    <Form.Group controlId="password">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between align-items-center mt-4">
                  <Form.Check type="checkbox" label="Subscribe to Newsletter" defaultChecked />
                  <Button type="submit" variant="primary">
                    Update Profile
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProfileScreen;
