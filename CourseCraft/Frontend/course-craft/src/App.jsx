import "./styles/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginStudent from "./components/LoginStudent";
import RegisterStudent from "./components/RegisterStudent";
import Home from "./components/Home";
import Courses from "./components/Courses";
import About from "./components/About";
import LoginTeacher from "./components/LoginTeacher";
import RegisterTeacher from "./components/RegisterTeacher";
import { AuthProvider } from "./context/authContext";
import CourseDetail from "./components/CourseDetail";
import EnrolledCourse from "./components/EnrolledCourse";
import TeacherCourseDetail from "./components/TeacherCourseDetail";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/about" element={<About />} />
            <Route path="/student/login" element={<LoginStudent />} />
            <Route path="/student/register" element={<RegisterStudent />} />
            <Route path="/teacher/login" element={<LoginTeacher />} />
            <Route path="/teacher/register" element={<RegisterTeacher />} />
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/enrolled/courses/:id" element={<EnrolledCourse />} />
            <Route path="/courses/materials/:id" element={<TeacherCourseDetail />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
