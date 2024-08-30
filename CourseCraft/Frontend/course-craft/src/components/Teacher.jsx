import React, { useContext, useEffect, useState } from "react";
import { ADD_COURSE, GET_INSTRUCTOR_COURSES } from "../routes/Routes";
import AuthContext from "../context/authContext";
import TeacherCourseCard from "./TeacherCourseCard";
import "../styles/Teacher.css"

const Teacher = () => {
  const { user } = useContext(AuthContext);
  const [createdCourses, setCreatedCourses] = useState([]);
  // console.log(user);
  const [course, setCourse] = useState({
    title: "",
    description: "",
    duration: "",
    preRequisites: [],
    referenceTextBooks: [],
    instructorId: user.teacherId,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [preRequisite, setPreRequisite] = useState("");
  const [referenceTextBook, setReferenceTextBook] = useState("");

  const handlePreRequisiteChange = (event) => {
    setPreRequisite(event.target.value);
  };

  const handleReferenceTextBookChange = (event) => {
    setReferenceTextBook(event.target.value);
  };

  const handlePreRequisiteKeyPress = (e) => {
    if (e.key === "Enter") {
      // setList([...list, inputValue]);
      setCourse((prev) => ({
        ...prev,
        [e.target.name]: [...prev.preRequisites, preRequisite],
      }));
      setPreRequisite("");
    }
  };
  const handleReferenceTextBookKeyPress = (e) => {
    if (e.key === "Enter") {
      // setList([...list, inputValue]);
      setCourse((prev) => ({
        ...prev,
        [e.target.name]: [...prev.referenceTextBooks, referenceTextBook],
      }));
      setReferenceTextBook("");
    }
  };

  const handleRemovereferenceTextBook = (index) => {
    const newList = [...course.referenceTextBooks];
    newList.splice(index, 1);
    // setList(newList);
    console.log("remove");
    setCourse((prev) => ({
      ...prev,
      ["referenceTextBooks"]: [...newList],
    }));
  };

  const handleRemovePreRequisite = (index) => {
    const newList = [...course.preRequisites];
    newList.splice(index, 1);
    // setList(newList);
    setCourse((prev) => ({
      ...prev,
      ["preRequisites"]: [...newList],
    }));
  };

  const handleSubmit = async () => {
    console.log(course);
    setCourse((prev) => ({ ...prev, ["instructorId"]: user.teacherId }));
    try {
      const response = await fetch(ADD_COURSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(course),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCreatedCourses = async () => {
    if (user.teacherId) {
      try {
        const response = await fetch(
          `${GET_INSTRUCTOR_COURSES}/${user.teacherId}`
        );
        const data = await response.json();
        setCreatedCourses(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user.teacherId) {
      getCreatedCourses();
    }
  }, []);
  return (
    <div className="container">
      <>
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Create Course
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      placeholder="Title"
                      name="title"
                      value={course.title}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Description"
                      value={course.description}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="duration">Duration</label>
                    <input
                      type="text"
                      className="form-control"
                      id="duration"
                      name="duration"
                      placeholder="E.g 3months"
                      value={course.duration}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="preRequisites">Pre-requisites</label>
                    <input
                      type="text"
                      className="form-control"
                      id="preRequisites"
                      name="preRequisites"
                      placeholder="Pre-requisites"
                      value={preRequisite}
                      onChange={handlePreRequisiteChange}
                      onKeyPress={handlePreRequisiteKeyPress}
                    />
                    <div className="chips-container">
                      {course.preRequisites.map((preRequ, index) => (
                        <div className="chip" key={preRequ}>
                          {preRequ}{" "}
                          <span
                            className="p-2"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              borderRadius: "2px",
                            }}
                            onClick={() => handleRemovePreRequisite(index)}
                          >
                            {"  "} X{" "}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="referenceTextBooks">
                      Reference TextBooks
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="referenceTextBooks"
                      name="referenceTextBooks"
                      placeholder="Reference TextBooks"
                      value={referenceTextBook}
                      onChange={handleReferenceTextBookChange}
                      onKeyPress={handleReferenceTextBookKeyPress}
                    />
                    <div className="chips-container">
                      {course.referenceTextBooks.map((tb, index) => (
                        <div className="chip p-2" key={tb}>
                          {tb}{" "}
                          <span
                            className="p-2"
                            style={{
                              cursor: "pointer",
                              color: "red",
                              borderRadius: "2px",
                            }}
                            onClick={() => handleRemovereferenceTextBook(index)}
                          >
                            {"  "} X{" "}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-danger"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmit}
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </>

      <div
        className="alert alert-primary d-flex justify-content-between"
        role="alert"
      >
        <h1>Create New Course</h1>
        <button
          type="button"
          className="btn btn-success w-25"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Add
        </button>
      </div>

      {createdCourses.length > 0 ? 
      <>
      <div className="created-courses">
        {createdCourses.map((ccourse) => (
          <TeacherCourseCard course={ccourse} key={ccourse.courseId}/>
        ))}
      </div>
      </> 
      : <h1>You haven't created any courses yet...!</h1>}
    </div>
  );
};

export default Teacher;
