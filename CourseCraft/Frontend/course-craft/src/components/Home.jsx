import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";
import Student from "./Student";
import Teacher from "./Teacher";

const Home = () => {
  const { user, isTeacher } = useContext(AuthContext);
  return (
    <div className="container">
      {user ? (
        <>
          {isTeacher ? (
            <>
              <Teacher />
            </>
          ) : (
            <>
              <Student />
            </>
          )}
        </>
      ) : (
        <>
          <div className="card" style={{ width: "18rem" }}>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <Link to={"/student/login"}>Login as Student</Link>
              </li>
              <li className="list-group-item">
                <Link to={"/student/register"}>Register as Student</Link>
              </li>
              <li className="list-group-item">
                <Link to={"/teacher/login"}>Login as Teacher</Link>
              </li>
              <li className="list-group-item">
                <Link to={"/teacher/register"}>Register as Teacher</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
