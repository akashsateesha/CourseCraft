import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AVAILABLE_COURSES, ENROLLE_COURSE, GET_FILE } from "../routes/Routes";
import "../styles/EnrolledCourse.css";
import TopicMaterials from "./TopicMaterials";

const EnrolledCourse = () => {
  const { courseId } = useLocation().state;
  const [course, setCourse] = useState({});

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
        <button className="btn btn-primary w-100">Enrolled</button>
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
            return <TopicMaterials topic={topic} key={topic.topicId} index = {index + 1}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default EnrolledCourse;
