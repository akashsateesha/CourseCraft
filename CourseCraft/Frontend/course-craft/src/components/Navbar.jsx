import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authContext";

const Navbar = () => {
  const { user, logOut, searchText, setSearchText } = useContext(AuthContext);
  const handleTextChange = (e) => {
    setSearchText(e.target.value);
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Course-Craft
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/courses">
              Courses
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
        <div className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Courses here..."
            aria-label="Search"
            value={searchText}
            onChange={handleTextChange}
          />
          {/* <button className="btn btn-outline-success my-2 my-sm-0">
            Search
          </button> */}
          {user ? (
            <>
              <button className="btn btn-primary my-2 my-sm-0 mx-2">
                {user.username}
              </button>
              <button
                className="btn btn-danger my-2 my-sm-0 mx-2"
                onClick={() => logOut()}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-success my-2 my-sm-0 mx-2" to={"/"}>
                Login
              </Link>
              <Link
                className="btn btn-success my-2 my-sm-0 mx-2"
                to={"/"}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
