import React from "react";
import "../styles/CourseCard.css";
import { Link } from "react-router-dom";

const TeacherCourseCard = ({ course }) => {
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
        <Link to={`/courses/materials/${course.courseId}`} className="btn btn-primary" state={{courseId: course.courseId}}>
          View Course
        </Link>
      </div>
    </div>
  );
};

export default TeacherCourseCard;
