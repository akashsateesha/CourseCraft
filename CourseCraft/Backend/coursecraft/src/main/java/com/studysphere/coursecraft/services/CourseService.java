package com.studysphere.coursecraft.services;

import com.studysphere.coursecraft.models.Course;
import com.studysphere.coursecraft.models.Teacher;
import com.studysphere.coursecraft.models.Topic;
import com.studysphere.coursecraft.repositories.CourseRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Course addCourse(String title, String duration, String description, List<String> preRequisites, List<String> referenceTextBooks, String instructorId){

        ObjectId id = new ObjectId(instructorId);
        Optional<Teacher> _teacher = teacherService.getTeacherById(id);

        Teacher teacher = null;

        if(_teacher.isPresent()){
            teacher = new Teacher(
                    _teacher.get().getTeacherId(),
                    _teacher.get().getUsername(),
                    _teacher.get().getEmail(),
                    _teacher.get().getMobileNo(),
                    _teacher.get().getFirstname(),
                    _teacher.get().getLastname(),
                    _teacher.get().getProfilePicture(),
                    _teacher.get().getQualification());
        }

        String courseId = new ObjectId().toString();
        Course course = courseRepository.insert(new Course(courseId, title, duration, description, preRequisites, referenceTextBooks, teacher));

        return new Course(course.getCourseId(), course.getTitle(), course.getDuration(), course.getDescription(), course.getPreRequisites(), course.getReferenceTextBooks(), course.getInstructor());
    }

    public void addTopic(ObjectId courseId, Topic topic){
        mongoTemplate.update(Course.class)
                .matching(Criteria.where("_id").is(courseId))
                .apply(new Update().push("topics").value(topic))
                .first();
    }

    public List<Course> getAllCourses(){
        return courseRepository.findAll();
    }
    public Optional<Course> getCourseById(String id){
        return courseRepository.findById(new ObjectId(id));
    }

    public List<Course> getAllCoursesOfInstructor(String id){
        Optional<Teacher> _teacher = teacherService.getTeacherById(new ObjectId(id));
        if(_teacher.isPresent()) {
            Teacher teacher = new Teacher(
                    _teacher.get().getTeacherId(),
                    _teacher.get().getUsername(),
                    _teacher.get().getEmail(),
                    _teacher.get().getMobileNo(),
                    _teacher.get().getFirstname(),
                    _teacher.get().getLastname(),
                    _teacher.get().getProfilePicture(),
                    _teacher.get().getQualification());
        }
        List<Course> courseList = courseRepository.findAll();
        List<Course> requiredCourses = new ArrayList<>();
        for (Course c : courseList){
            if (Objects.equals(c.getInstructor().getTeacherId(), id)){
                requiredCourses.add(c);
            }
        }
        return requiredCourses;
    }
}
