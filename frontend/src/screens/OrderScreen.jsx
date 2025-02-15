import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/ordersApiSlice";
import { Row, Col, Card, ListGroup, Image } from "react-bootstrap";
import "../styles/OrderScreen.css"; // Import custom styles
import { useDeliverOrderMutation } from "../slices/ordersApiSlice.js";
import { useSelector } from "react-redux";


const OrderScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading, error, refetch } = useGetOrderDetailsQuery(orderId);
  const { userInfo } = useSelector((state) => state.auth);


  const [deliverOrder]=useDeliverOrderMutation();
  const delivereOrderHandler=async()=>{
    try {
      await deliverOrder(orderId);
      refetch();
      alert('orders success')
    } catch (err) {
      alert (err?.data?.message || err.message);
    }
  }
  return isLoading ? (
    <h3>Loading....</h3>
  ) : error ? (
    <h2>{error.message}</h2>
  ) : (
    <div className="order-container">
      <h2 className="order-title">Order Summary</h2>

      {/* Order Status */}
      <Row>
        <Col md={8}>
          <Card className="mb-4 order-card">
            <Card.Body>
              <h4>Shipping Details</h4>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{" "}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <div>
                  <button type='button' className="btn btn-block" onClick={delivereOrderHandler}>Mark as Delivered</button>
                </div>
              )
                }
              {order.isDelivered ? (
                <h5 className="success">Delivered on {order.deliveredAt}</h5>
              ) : (
                <h3 variant="warning">Not Delivered</h3>
              )}
            </Card.Body>
          </Card>

          {/* Payment Info */}
          <Card className="mb-4 order-card">
            <Card.Body>
              <h4>Payment Method</h4>
              <p>
                <strong>Method: </strong> {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <h4 variant="success">Paid on {order.paidAt}</h4>
              ) : (
                <h4 variant="danger">Not Paid</h4>
              )}
            </Card.Body>
          </Card>

          {/* Ordered Items */}
          <Card className="mb-4 order-card">
            <Card.Body>
              <h4>Order Items</h4>
              {order.orderItems.length === 0 ? (
                <h3>Your order is empty</h3>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index} className="order-item">
                      <Row>
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={6}>
                          <strong>{item.name}</strong>
                          <p>Size: {item.size}</p>
                        </Col>
                        <Col md={4} className="text-end">
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Order Summary */}
        <Col md={4}>
          <Card className="order-card">
            <Card.Body>
              <h4>Order Summary</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items:</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping:</Col>
                    <Col>${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax:</Col>
                    <Col>${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item className="total-row">
                  <Row>
                    <Col>Total:</Col>
                    <Col className="fw-bold">${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
