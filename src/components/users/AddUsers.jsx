import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddUsers() {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    phone: "",
    email: "",
    password: "",
    role: "",
  });

  const { name, username, phone, email, password, role } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3003/users", user);
    navigate("/");
  };

  return (
    <div className="container">
      <form className="myForm my-3" onSubmit={(e) => onSubmit(e)}>
        <h1>Add A User</h1>
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control"
            id="exampleInputName"
            value={name}
            required
            aria-describedby="emailHelp"
            placeholder="Enter Your Name"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="username"
            required
            className="form-control"
            id="exampleInputUsername"
            value={username}
            placeholder="Enter Your Username"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="phone"
            className="form-control"
            id="exampleInputPhone"
            value={phone}
            placeholder="Enter Your Phone Number"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group ">
          <select class="form-select form-control" name="role" value={role} onChange={(e) => onInputChange(e)} aria-label="Default select example" required>
            <option selected>-- Select Role --</option>
            <option value="user">User</option>
            <option value="support">Tech Support</option>
          </select>
        </div>
        <div className="form-group ">
          <input
            type="text"
            name="email"
            className="form-control"
            id="exampleInputEmail"
            value={email}
            aria-describedby="emailHelp"
            placeholder="Enter your E-mail Address"
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            className="form-control"
            required
            id="exampleInputpassword"
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => onInputChange(e)}
          />
        </div>

        <button type="submit" className="btn btn-primary myButton">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddUsers;
