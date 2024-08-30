package com.studysphere.coursecraft.services;

import com.studysphere.coursecraft.models.Course;
import com.studysphere.coursecraft.models.Student;
import com.studysphere.coursecraft.repositories.CourseRepository;
import com.studysphere.coursecraft.repositories.StudentRepository;
import com.studysphere.coursecraft.utils.CourseCraftUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private CourseRepository courseRepository;

    public Optional<Student> getStudent(String username){
        return studentRepository.findStudentByUsername(username);
    }

    public Student createStudent(String studentId, String username, String email, String password, String mobileNo, String firstname, String lastname, String profilePicture){
        String hashedPassword = CourseCraftUtils.hashPassword(password);
        Student student = studentRepository.insert(new Student(studentId, username, email, hashedPassword, mobileNo, firstname, lastname, profilePicture));
        return new Student(student.getStudentId(), student.getUsername(), student.getEmail(), student.getMobileNo(), student.getFirstname(), student.getLastname(), profilePicture);
    }

    public Optional<Student> loginUser(String username, String password){
        Optional<Student> student = studentRepository.findStudentByUsername(username);
        if(student.isPresent()){
            if(CourseCraftUtils.matchPassword(password, student.get().getPassword())){
                return Optional.of(new Student(student.get().getStudentId(), student.get().getUsername(), student.get().getEmail(), student.get().getMobileNo(), student.get().getFirstname(), student.get().getLastname(), student.get().getProfilePicture()));
            }
        }
        return Optional.empty();
    }



    public Optional<Course> enrollStudentCourse(String courseId, String studentId){
        Optional<Course> course = courseRepository.findById(new ObjectId(courseId));

        if(course.isPresent()){
            Course _course = new Course(course.get().getCourseId(), course.get().getTitle(), course.get().getDuration(), course.get().getDescription(), course.get().getPreRequisites(), course.get().getReferenceTextBooks(), course.get().getInstructor());
            mongoTemplate.update(Student.class)
                    .matching(Criteria.where("_id").is(new ObjectId(studentId)))
                    .apply(new Update().push("enrolledCourses").value(_course))
                    .first();
        }
        return course;
    }
}
