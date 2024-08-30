import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";

const LoginStudent = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const { loginStudent } = useContext(AuthContext);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };
  return (
    <div className="container">
      <h1 className="text-center">Student Login</h1>
      <form onSubmit={(e) => loginStudent(e, credentials)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="username"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={handleOnChange}
            value={credentials.username}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your details with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={handleOnChange}
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginStudent;
