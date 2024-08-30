package com.studysphere.coursecraft.controllers;

import com.studysphere.coursecraft.models.Course;
import com.studysphere.coursecraft.models.FileData;
import com.studysphere.coursecraft.models.Student;
import com.studysphere.coursecraft.services.StudentService;
import com.studysphere.coursecraft.utils.CourseCraftUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.studysphere.coursecraft.utils.CourseCraftUtils.addFile;

@RestController
@RequestMapping("/api/users/student")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @Autowired
    private GridFsTemplate template;

    @Autowired
    private GridFsOperations operations;

    @PostMapping("/register")
    public ResponseEntity<Student> registerStudent(
            @RequestParam("file") MultipartFile file,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("mobileNo") String mobileNo,
            @RequestParam("firstname") String firstname,
            @RequestParam("lastname") String lastname
    ) throws IOException {

        String profilePicture = addFile(template, file);
        String studentId = new ObjectId().toString();
        return new ResponseEntity<Student>(studentService.createStudent(studentId, username, email, password, mobileNo, firstname, lastname, profilePicture), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Optional<Student>> loginStudent(@RequestBody Map<String, String> payload) {
        Optional<Student> response = studentService.loginUser(payload.get("username"), payload.get("password"));
        if(response.isPresent()){
            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<>(Optional.empty(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/enroll-course")
    public ResponseEntity<Optional<Course>> enrollCourse(@RequestBody Map<String, String> payload){
        return new ResponseEntity<>(studentService.enrollStudentCourse(payload.get("courseId"), payload.get("studentId")), HttpStatus.CREATED);
    }

    @GetMapping("/enrolled-courses/{username}")
    public ResponseEntity<List<Course>> getEnrolledCourses(@PathVariable String username){
        Optional<Student> student = studentService.getStudent(username);
        return student.map(value -> new ResponseEntity<>(value.getEnrolledCourses(), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK));
    }

    @GetMapping("/profile-picture/{id}")
    public ResponseEntity<byte[]> downloadUserProfilePicture(@PathVariable String id) throws IOException {
        FileData file = CourseCraftUtils.downloadFile(template, operations, id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(file.getFileType()));
        headers.setContentDisposition(ContentDisposition.inline().filename(file.getFilename()).build());

        return new ResponseEntity<>(file.getFile(), headers, HttpStatus.OK);
    }

    @GetMapping("/logout")
    public String logoutStudent(){
        return "Logout";
    }
}
