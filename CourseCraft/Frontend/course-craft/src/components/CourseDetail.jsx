import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AVAILABLE_COURSES, ENROLLE_COURSE } from "../routes/Routes";
import "../styles/CourseDetail.css";
import AuthContext from "../context/authContext";

const CourseDetail = () => {
  const { courseId } = useLocation().state;
  const [course, setCourse] = useState({});
  const { user } = useContext(AuthContext);
  const navigateTo = useNavigate();
  const getCourse = async () => {
    try {
      const response = await fetch(`${AVAILABLE_COURSES}/${courseId}`);
      const data = await response.json();

      if (data) {
        setCourse(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const enrollCourse = async () => {
    try {
      const response = await fetch(ENROLLE_COURSE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: courseId,
          studentId: user?.studentId,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data) {
        navigateTo("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (courseId) {
      getCourse();
    }
  }, [courseId]);
  return (
    <div className="course-detail m-3">
      <div className="course-detail-img-wrap">
        <img
          className="card-img-top course-detail-img"
          src={`https://ui-avatars.com/api/?name=${course?.title}&background=0D8ABC&color=fff`}
          alt="Card image cap"
        />
        <div>
          <h3>Pre-requisites</h3>
          <div className="chips-container">
            {course?.preRequisites?.map((preReq, index) => {
              return (
                <span className="chip" key={preReq + index}>
                  {preReq}
                </span>
              );
            })}
          </div>
        </div>
        <div>
          <h3>Reference Textbooks</h3>
          <div className="chips-container">
            {course?.referenceTextBooks?.map((textbook, index) => {
              return (
                <span className="chip" key={textbook + index}>
                  {textbook}
                </span>
              );
            })}
          </div>
        </div>
        <button
          className="btn btn-primary w-100"
          onClick={enrollCourse}
          disabled={user ? false : true}
          style={{ cursor: user ? null : "not-allowed" }}
        >
          {user ? "Enroll" : "Login to Enroll"}
        </button>
      </div>
      <div className="details">
        <h1>{course?.title}</h1>
        <h3 className="instructor">
          {"Instructor:"} {course?.instructor?.firstname}{" "}
          {course?.instructor?.lastname}
        </h3>
        <h5 style={{ color: "gray" }}>Description:</h5>
        <p style={{ color: "darkgray" }}>{course?.description}</p>
        <div className="topics">
          <h3>Topics</h3>
          {course?.topics?.map((topic, index) => {
            return (
              <div className="topic" key={topic.topicId}>
                <h4>
                  {index + 1}. {topic.topicName}
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
