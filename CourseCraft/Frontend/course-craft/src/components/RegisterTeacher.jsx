import React, {useState } from "react";
import { TEACHER_REGISTER } from "../routes/Routes";
import { useNavigate } from "react-router-dom";
const RegisterTeacher = () => {
  const navigateTo = useNavigate()
  const [fileName, setFileName] = useState("Choose File");
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobileNo: "",
    username: "",
    profilePicture: null,
    qualification: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      [name]: value,
    }));
  };

  const handleOnProfilePicture = (e) => {
    // console.log(e.target.files);
    const file = e.target.files[0];
    setFileName(file.name);
    setRegisterData((prevRegisterData) => ({
      ...prevRegisterData,
      profilePicture: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("username", registerData.username);
    formData.append("password", registerData.password);
    formData.append("email", registerData.email);
    formData.append("firstname", registerData.firstname);
    formData.append("lastname", registerData.lastname);
    formData.append("mobileNo", registerData.mobileNo);
    formData.append("qualification", registerData.qualification);
    formData.append("file", registerData.profilePicture);

    try {
      const response = await fetch(TEACHER_REGISTER, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data?.username) {
        navigateTo("/teacher/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="container">
      <h1 className="text-center">Teacher Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputUsername4">Username</label>
            <input
              type="text"
              className="form-control"
              id="inputUsername4"
              placeholder="Username"
              name="username"
              onChange={handleOnChange}
              value={registerData.username}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
              name="password"
              onChange={handleOnChange}
              value={registerData.password}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputFirstname4">Firstname</label>
            <input
              type="text"
              className="form-control"
              id="inputFirstname4"
              placeholder="Firstname"
              name="firstname"
              onChange={handleOnChange}
              value={registerData.firstname}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputLastname4">Lastname</label>
            <input
              type="text"
              className="form-control"
              id="inputLastname4"
              placeholder="Lastname"
              name="lastname"
              onChange={handleOnChange}
              value={registerData.lastname}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputQualification4">Qualification</label>
            <input
              type="text"
              className="form-control"
              id="inputQualification4"
              placeholder="Qualification"
              name="qualification"
              onChange={handleOnChange}
              value={registerData.qualification}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              placeholder="Email"
              name="email"
              onChange={handleOnChange}
              value={registerData.email}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputMobileNo4">Mobile No</label>
            <input
              type="text"
              className="form-control"
              id="inputMobileNo4"
              placeholder="Mobile No"
              name="mobileNo"
              onChange={handleOnChange}
              value={registerData.mobileNo}
            />
          </div>
          <div className="custom-file my-3">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={handleOnProfilePicture}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {fileName}
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterTeacher;
