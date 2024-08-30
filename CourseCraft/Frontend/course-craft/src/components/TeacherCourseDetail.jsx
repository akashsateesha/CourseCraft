import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ADD_MATERIAL_COURSE, AVAILABLE_COURSES } from "../routes/Routes";
import "../styles/CourseDetail.css";
import AuthContext from "../context/authContext";
import TopicMaterials from "./TopicMaterials";

const TeacherCourseDetail = () => {
  const { courseId } = useLocation().state;
  const [course, setCourse] = useState({});
  const { user } = useContext(AuthContext);
  const [topic, setTopic] = useState({
    courseId: courseId,
    topicName: "",
    files: [],
  });

  const handleOnFileChange = (e) => {
    setTopic((prev) => ({
      ...prev,
      ["files"]: e.target.files,
    }));
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setTopic((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveFile = (index) => {
    const newList = [...topic.files];
    newList.splice(index, 1);
    setTopic((prev) => ({
      ...prev,
      ["files"]: newList,
    }));
  };

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

  useEffect(() => {
    if (courseId) {
      getCourse();
    }
  }, [courseId]);

  const handleSubmit = async () => {
    if (courseId) {
      const formData = new FormData();
      formData.append("courseId", topic.courseId);
      formData.append("topicName", topic.topicName);
      for (let i = 0; i < topic.files.length; i++) {
        formData.append("files", topic.files[i]);
      }

      try {
        const response = await fetch(ADD_MATERIAL_COURSE, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        setCourse((prev) => (
          {
            ...prev, ["topics"]: [...prev.topics, data]
          }
        ))
      } catch (error) {
        console.error(error);
      }
      // console.log(formData);
    } else {
      console.error("courseId is missing");
    }
  };

  return (
    <div className="course-detail m-3">
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
                  Add Topic
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
                    <label htmlFor="topicName">Topic Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="topicName"
                      placeholder="Topic Name"
                      name="topicName"
                      value={topic.topicName}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="custom-file my-3">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      onChange={handleOnFileChange}
                      multiple={true}
                    />
                    <label className="custom-file-label" htmlFor="customFile">
                      Choose Files
                    </label>
                    <div className="chips-container">
                      {[...topic.files].map((file, index) => (
                        <div className="chip" key={file.name}>
                          {file.name} &nbsp; &nbsp;{" "}
                          <span
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleRemoveFile(index)}
                          >
                            X
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
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
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
          type="button"
          className="btn btn-success w-100"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Add Topic
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
            return <TopicMaterials topic={topic} key={topic.topicId} index = {index + 1}/>;
          })}
        </div>
      </div>
    </div>
  );
};

export default TeacherCourseDetail;
