import React, { useContext, useEffect, useState } from "react";
import { AVAILABLE_COURSES, ENROLLED_COURSES } from "../routes/Routes";
import CourseCard from "./CourseCard";
import "../styles/Student.css";
import AuthContext from "../context/authContext";

const Student = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [availableCourses, setAvailableCourses] = useState([]);
  const { user, setAuthEnrolledCourses } = useContext(AuthContext);
  const getAllCourses = async () => {
    try {
      const response = await fetch(AVAILABLE_COURSES, {
        method: "GET",
      });
      const data = await response.json();
      if (data) {
        setAvailableCourses(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getEnrolledCourses = async () => {
    try {
      const response = await fetch(`${ENROLLED_COURSES}/${user?.username}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data) {
        setAuthEnrolledCourses(data);
        setEnrolledCourses(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      getAllCourses();
      getEnrolledCourses();
    }
  }, []);
  return (
    <div className="container">
      <div>
        <h3>Enrolled Courses</h3>
        <div className="enrolled-courses">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => {
              return <CourseCard course={course} key={course.courseId} />;
            })
          ) : (
            <p>You are not yet enrolled to any of our courses</p>
          )}
        </div>
      </div>

      <h3>Available Courses to Enroll</h3>
      <div className="available-courses">
        {availableCourses.filter(course => !enrolledCourses.map(enc => enc.courseId).includes(course.courseId))
          .map((course, index) => {
            return <CourseCard course={course} key={course.courseId + index} />;
          })}
      </div>
    </div>
  );
};

export default Student;
