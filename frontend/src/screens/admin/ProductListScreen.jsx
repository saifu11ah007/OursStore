import React from 'react';
import { useGetProductsQuery } from '../../slices/productsApiSlice.js';
import { Table, Button, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useCreateProductMutation, useDeleteProductMutation } from '../../slices/productsApiSlice.js';
const ProductListScreen = () => {
  const { data: products, isLoading, error,refetch } = useGetProductsQuery();
  const [ createProduct] = useCreateProductMutation();
  const [ deleteProduct] = useDeleteProductMutation();
  const deleteHandler = async(id) => {
    if(window.confirm('Are u sure?')){
      try {
        await deleteProduct(id);
        refetch();
      } catch (err) {
        alert (err?.data?.message || err.message);
      }
    }
  };
  const createProductHandler=async()=>{
    try {
      await createProduct();
      refetch();
      alert('created success')
    } catch (err) {
      alert (err?.data?.message || err.message);
    }
  }
  return (
    <div>
      <h1>Products</h1>
      <Col className="text-end">
        <Button className="btn-sm m-3" onClick={createProductHandler}>
          Create Product
        </Button>
      </Col>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h2>Error loading products</h2>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Size</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>Rs. {product.price}</td>
                  <td>{product.sizes.map((s) => s.size).join(", ")}</td>

                  <td>{product.countInStock}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>

                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button className="btn-sm" variant="light">Details</Button>
                    </Link>
                    <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(product._id)}>
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductListScreen;