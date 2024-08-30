import React, { useContext, useEffect, useState } from "react";
import { AVAILABLE_COURSES } from "../routes/Routes";
import CourseCard from "./CourseCard";
import AuthContext from "../context/authContext";

const Courses = () => {
  const { searchText } = useContext(AuthContext);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

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

  useEffect(() => {
    getAllCourses();
  }, []);

  useEffect(() => {
    if (searchText) {
      setFilteredCourses()
      setFilteredCourses(
        () => availableCourses.filter((course) => course.title.toLowerCase().includes(searchText))
      );
    }
  }, [searchText]);
  return (
    <div className="container">
      <div className="available-courses">
        {filteredCourses.length > 0 ? (
          <>
            {filteredCourses.map((course, index) => {
              return (
                <CourseCard course={course} key={course.courseId + index} />
              );
            })}
          </>
        ) : (
          <>
            {availableCourses.map((course, index) => {
              return (
                <CourseCard course={course} key={course.courseId + index} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
