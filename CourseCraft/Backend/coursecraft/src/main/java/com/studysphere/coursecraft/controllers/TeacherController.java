package com.studysphere.coursecraft.controllers;

import com.studysphere.coursecraft.models.Course;
import com.studysphere.coursecraft.models.CourseHelper;
import com.studysphere.coursecraft.models.FileData;
import com.studysphere.coursecraft.models.Teacher;
import com.studysphere.coursecraft.services.CourseService;
import com.studysphere.coursecraft.services.TeacherService;
import com.studysphere.coursecraft.utils.CourseCraftUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

import static com.studysphere.coursecraft.utils.CourseCraftUtils.addFile;

@RestController
@RequestMapping("/api/users/teacher")
public class TeacherController {

    @Autowired
    private GridFsTemplate template;

    @Autowired
    private GridFsOperations operations;

    @Autowired
    private TeacherService teacherService;

    @Autowired
    private CourseService courseService;
    @PostMapping("/upload")
    public List<String> uploadFiles(@RequestParam("files") MultipartFile[] files) throws IOException {
        return CourseCraftUtils.addMultipleFiles(template, files);
    }

    @PostMapping("/add/course")
    public ResponseEntity<Course> addCourse(@RequestBody CourseHelper course){
        String title = course.getTitle();
        String duration = course.getDuration();
        String description = course.getDescription();
        List<String> preRequisites = course.getPreRequisites();
        List<String> referenceTextBooks = course.getReferenceTextBooks();
        String instructorId = course.getInstructorId();

        return new ResponseEntity<>(courseService.addCourse(title, duration, description, preRequisites, referenceTextBooks, instructorId), HttpStatus.CREATED);
    }

    @PostMapping("/register")
    public ResponseEntity<Teacher> registerTeacher(
            @RequestParam("file") MultipartFile file,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("mobileNo") String mobileNo,
            @RequestParam("firstname") String firstname,
            @RequestParam("lastname") String lastname,
            @RequestParam("qualification") String qualification
    ) throws IOException {

        String profilePicture = addFile(template, file);

        return new ResponseEntity<Teacher>(teacherService.createTeacher(username, email, password, mobileNo, firstname, lastname, profilePicture, qualification), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<Optional<Teacher>> loginTeacher(@RequestBody Map<String, String> payload) {
        Optional<Teacher> response = teacherService.loginTeacher(payload.get("username"), payload.get("password"));
        if(response.isPresent()){
            return new ResponseEntity<>(response, HttpStatus.ACCEPTED);
        }else{
            return new ResponseEntity<>(Optional.empty(), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/profile-picture/{id}")
    public ResponseEntity<byte[]> downloadTeacherProfilePicture(@PathVariable String id) throws IOException {
        FileData file = CourseCraftUtils.downloadFile(template, operations, id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(file.getFileType()));
        headers.setContentDisposition(ContentDisposition.inline().filename(file.getFilename()).build());

        return new ResponseEntity<>(file.getFile(), headers, HttpStatus.OK);
    }

    @GetMapping("/all-courses/{id}")
    public ResponseEntity<List<Course>> getAllCourses(@PathVariable String id){
        return new ResponseEntity<>(courseService.getAllCoursesOfInstructor(id), HttpStatus.OK);
    }

}
