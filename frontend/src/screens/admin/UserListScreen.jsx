import React from 'react';
import { useGetUsersQuery, useDeleteUsersMutation } from '../../slices/usersApiSlice.js';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaTimes,FaEdit,FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserListScreen = () => {
  const { data: users,refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser]=useDeleteUsersMutation();
  const deleteHandler = async(id) => {
    if(window.confirm('Are u sure?')){
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        alert (err?.data?.message || err.message);
      }
    }
  };
  return (
    <div>
      <h1>Users</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h2>Error loading Users</h2>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>Admin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <Link to={`admin/user/${user._id}/edit`}>
                    <Button className="btn-sm" variant="light">
                      <FaEdit/>
                    </Button>
                  </Link>
                  <Button className="btn-sm" variant="danger" onClick={()=> deleteHandler(user._id)}>
                      <FaTrash/>
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

export default UserListScreen;
