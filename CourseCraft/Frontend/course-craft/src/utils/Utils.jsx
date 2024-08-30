import { useContext } from "react";
import AuthContext from "../context/authContext";

export function isEnrolled(courseId) {
  const { enrolledCourses } = useContext(AuthContext);
  return enrolledCourses.find((course) => course.courseId === courseId);
}
