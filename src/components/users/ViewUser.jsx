import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const { id } = useParams();

  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/users/${id}`);
    setUser(res.data);
  };
  
  useEffect(() => {
    loadUser();
  }, []);

  const role = localStorage.getItem('USER_ROLE');
  return (
    <div className="container py-4">
      <Link className="btn btn-primary" to={`/${role}`}>
        Back to Home
      </Link>
      <br />
      <br />
      <ul className="list-group w-50">
        <li className="list-group-item">name : {user.name}</li>
        <li className="list-group-item">username : {user.username}</li>
        <li className="list-group-item">phone : {user.phone}</li>
        <li className="list-group-item">email : {user.email}</li>
        <li className="list-group-item">password : ********</li>
        <li className="list-group-item">Role : {user.role}</li>
      </ul>
    </div>
  );
}

export default ViewUser;
