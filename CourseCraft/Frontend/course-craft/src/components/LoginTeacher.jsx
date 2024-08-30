import React, {useState, useContext} from "react";
import AuthContext from "../context/authContext";

const LoginTeacher = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const {loginTeacher} = useContext(AuthContext)
  
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h1 className="text-center">Teacher Login</h1>
      <form onSubmit={(e) => loginTeacher(e, credentials)}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            name="username"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            value={credentials.username}
            onChange={handleOnChange}
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
            value={credentials.password}
            onChange={handleOnChange}
          />
        </div>

        <input type="submit" className="btn btn-primary" value={"Submit"}/>
          
      </form>
    </div>
  );
};

export default LoginTeacher;
