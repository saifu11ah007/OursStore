import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice.js';
import {  Button, Container, Row, Col, Card, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';
import '../styles/profilescreen.css';

const UserOrderScreen = () => {
  const [name, setName] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery(); // Fixed destructuring

  useEffect(() => {
    if (userInfo) {
      setName(userInfo?.name || '');
    }
  }, [userInfo]);

  const updateProfile = async ({ _id, name, password }) => {
    // Placeholder for profile update logic (should be implemented properly)
    return { _id, name, email: userInfo.email }; // Simulating API response
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
              <Button variant="info" size="sm">290 Points</Button>
            </Card.Footer>
          </Card>

          {/* Sidebar Links */}
          <ul className="list-group mt-4">
            <Link to={'/user-order'}>
              <li className="list-group-item d-flex justify-content-between align-items-center active">
                Orders List <span className="badge bg-secondary">6</span>
              </li>
            </Link>
            <Link to={'/profile'}>
              <li className="list-group-item">Profile Settings</li>
            </Link>
          </ul>
        </Col>

        {/* Orders Table Section */}
        <Col lg={8}>
          <Card className="shadow">
            <Card.Body>
              <h4 className="mb-4">My Orders</h4>
              {isLoading ? (
                <h3>Loading...</h3>
              ) : error ? (
                <h2>Error loading orders</h2>
              ) : (
                <Table striped bordered hover responsive className="table-sm">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>Rs. {order.totalPrice}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: 'red' }} />
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <FaTimes style={{ color: 'red' }} />
                          )}
                        </td>
                        <td>
                          <Link to={`/order/${order._id}`}>
                            <Button className="btn-sm" variant="light">Details</Button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderScreen;
