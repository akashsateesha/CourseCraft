import React, { createContext, useState } from "react";
import { STUDENT_LOGIN, TEACHER_LOGIN } from "../routes/Routes";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isTeacher, setIsTeacher] = useState(()=>JSON.parse(localStorage.getItem("isTeacher")))
  const [user, setUser] = useState(()=>JSON.parse(localStorage.getItem("user")));
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [searchText, setSearchText] = useState('')
  const navigateTo = useNavigate();

  const loginTeacher = async (e, credentials) => {
    e.preventDefault();
    try {
      const response = await fetch(TEACHER_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (data?.username) {
        setUser(data);
        setIsTeacher(true)
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("isTeacher", JSON.stringify(true));
        navigateTo("/")
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const loginStudent = async (e, credentials) => {
    e.preventDefault();
    try {
      const response = await fetch(STUDENT_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      if (data?.username) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigateTo("/")
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const logOut = () => {
    setUser(null);
    setIsTeacher(false)
    localStorage.clear();  
    navigateTo("/");
  };

  const contextData = {
    loginTeacher: loginTeacher,
    logOut: logOut,
    loginStudent: loginStudent,
    user: user,
    isTeacher: isTeacher,
    enrolledCourses: enrolledCourses,
    setAuthEnrolledCourses: setEnrolledCourses,
    searchText: searchText,
    setSearchText: setSearchText,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
};
