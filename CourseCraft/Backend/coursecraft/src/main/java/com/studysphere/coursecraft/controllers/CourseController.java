package com.studysphere.coursecraft.controllers;

import com.studysphere.coursecraft.models.Course;
import com.studysphere.coursecraft.models.FileData;
import com.studysphere.coursecraft.models.Topic;
import com.studysphere.coursecraft.services.CourseService;
import com.studysphere.coursecraft.services.TopicService;
import com.studysphere.coursecraft.utils.CourseCraftUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private GridFsTemplate template;

    @Autowired
    private GridFsOperations operations;

    @Autowired
    private TopicService topicService;

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses(){
        return new ResponseEntity<>(courseService.getAllCourses(), HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Course>> getCourseById(@PathVariable String id){
        return new ResponseEntity<>(courseService.getCourseById(id), HttpStatus.OK);
    }

    @PostMapping("/add/topic")
    public ResponseEntity<Topic> addTopic(
            @RequestParam("files") MultipartFile[] files,
            @RequestParam("topicName") String topicName,
            @RequestParam("courseId") String courseId
    ) throws IOException {
        List<String> content = CourseCraftUtils.addMultipleFiles(template, files);
        Topic newTopic = topicService.createTopic(topicName, content);
        courseService.addTopic(new ObjectId(courseId), newTopic);
        return new ResponseEntity<>(newTopic, HttpStatus.CREATED);
    }

    @PostMapping("/add/materials")
    public ResponseEntity<List<String>> addMaterialToCourse(@RequestParam("files") MultipartFile[] files) throws IOException {
        List<String> materialIds = CourseCraftUtils.addMultipleFiles(template, files);
        return new ResponseEntity<>(materialIds, HttpStatus.CREATED);
    }

    @GetMapping("/materials/{id}")
    public ResponseEntity<byte[]> downloadMaterial(@PathVariable String id) throws IOException {
        FileData file = CourseCraftUtils.downloadFile(template, operations, id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType(file.getFileType()));
        headers.setContentDisposition(ContentDisposition.inline().filename(file.getFilename()).build());
        headers.put("fileDetails", List.of(file.getFilename(), file.getFileSize(), file.getFileType()));
        headers.set("Access-Control-Expose-Headers", "fileDetails");
        return new ResponseEntity<>(file.getFile(), headers, HttpStatus.OK);
    }

}
