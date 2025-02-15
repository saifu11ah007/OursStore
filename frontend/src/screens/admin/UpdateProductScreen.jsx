import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { useGetProductsQuery, useUpdateProductMutation } from '../../slices/productsApiSlice.js';

const UpdateProductScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [updateProduct, { isLoading: updating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    description: '',
    brand: '',
    category: '',
    countInStock: 0,
    sizes: [],
    image: '',
    hoverImage: '',
    images: [],
    rating: 1,
    numReviews: 0,
    previousPrice: 0,
  });

  useEffect(() => {
    if (products) {
      const product = products.find((p) => p._id === productId);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          description: product.description,
          brand: product.brand,
          category: product.category,
          countInStock: product.countInStock,
          sizes: product.sizes,
          image: product.image,
          hoverImage: product.hoverImage,
          images: product.images,
          rating: product.rating,
          numReviews: product.numReviews,
          previousPrice: product.previousPrice,
        });
      }
    }
  }, [products, productId]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ _id: productId, ...formData });
      alert('Product updated successfully');
      navigate('/admin/product');
    } catch (err) {
      alert(err?.data?.message || err.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-lg rounded">
            <h2 className="text-center mb-4">Edit Product</h2>
            {isLoading ? (
              <div className="text-center">
                <Spinner animation="border" />
                <p>Loading...</p>
              </div>
            ) : error ? (
              <Alert variant="danger">Error loading product</Alert>
            ) : (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="price" className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control type="number" name="price" value={formData.price} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="previousPrice" className="mb-3">
                      <Form.Label>Previous Price</Form.Label>
                      <Form.Control type="number" name="previousPrice" value={formData.previousPrice} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleInputChange} />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="brand" className="mb-3">
                      <Form.Label>Brand</Form.Label>
                      <Form.Control type="text" name="brand" value={formData.brand} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="category" className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control type="text" name="category" value={formData.category} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="countInStock" className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control type="number" name="countInStock" value={formData.countInStock} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="rating" className="mb-3">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control type="number" name="rating" value={formData.rating} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="numReviews" className="mb-3">
                      <Form.Label>Number of Reviews</Form.Label>
                      <Form.Control type="number" name="numReviews" value={formData.numReviews} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="image" className="mb-3">
                      <Form.Label>Main Image URL</Form.Label>
                      <Form.Control type="text" name="image" value={formData.image} onChange={handleInputChange} />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="hoverImage" className="mb-3">
                  <Form.Label>Hover Image URL</Form.Label>
                  <Form.Control type="text" name="hoverImage" value={formData.hoverImage} onChange={handleInputChange} />
                </Form.Group>

                <div className="text-center">
                  <Button type="submit" variant="primary" className="px-4" disabled={updating}>
                    {updating ? <Spinner animation="border" size="sm" /> : 'Update Product'}
                  </Button>
                </div>
              </Form>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateProductScreen;
