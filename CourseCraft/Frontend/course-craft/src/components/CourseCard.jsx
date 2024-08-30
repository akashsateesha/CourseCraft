import React from "react";
import "../styles/CourseCard.css";
import { Link } from "react-router-dom";
import { isEnrolled } from "../utils/Utils";

const CourseCard = ({ course }) => {
  const enrolled = isEnrolled(course.courseId)
  return (
    <div className="card m-3" style={{ width: "18rem"}}>
      <img
        className="card-img-top course-card-img"
        src={`https://ui-avatars.com/api/?name=${course.title}&background=0D8ABC&color=fff`}
        alt="Card image cap"
      />
      <div className="card-body">
        <h4 className="card-title">{course.title}</h4>
        <div className="d-flex justify-content-between">
          <h5>{course.instructor.username}</h5>
          <p>{course.duration}</p>
        </div>
        <Link to={enrolled ? `enrolled/courses/${course.courseId}` : `/courses/${course.courseId}`} className="btn btn-primary" state={{courseId: course.courseId}}>
          {enrolled ? "Start Learning" : "View"}
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
