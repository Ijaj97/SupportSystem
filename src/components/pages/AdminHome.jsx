import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/users");
    setUsers(result.data.filter((data, k) => {
        return data.role != 'admin'
    }).reverse());
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3003/users/${id}`);
    loadUsers();
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container">
      <div className="py-4">
        <h1>User List</h1>
        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Contact</th>
              <th scope="col">Email</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
              <th style={{textAlign: "center"}}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.role}</td>
                <td className="d-flex justify-content-center">
                  <Link
                    to={`/users/${user.id}`}
                    className="btn btn-primary mr-2"
                  >
                    View
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminHome;
