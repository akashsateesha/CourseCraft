package com.studysphere.coursecraft.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.beans.ConstructorProperties;
import java.util.List;

@Document(collection = "courses")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    private String courseId;
    private String title;
    private String duration;
    private String description;
    private List<String> preRequisites;
    private List<String> referenceTextBooks;

    private List<Topic> topics;
    @DocumentReference
    private Teacher instructor;

    @ConstructorProperties({"courseId", "description", "duration", "referenceTextBooks", "preRequisites", "title", "instructor"})
    public Course(String courseId, String title, String duration, String description, List<String> preRequisites, List<String> referenceTextBooks, Teacher teacher){
        this.courseId = courseId;
        this.description = description;
        this.duration = duration;
        this.referenceTextBooks = referenceTextBooks;
        this.preRequisites = preRequisites;
        this.title = title;
        this.instructor = teacher;
    }

    public Course(String title, String duration, String description, List<String> preRequisites, List<String> referenceTextBooks, Teacher teacher){
        this.description = description;
        this.duration = duration;
        this.referenceTextBooks = referenceTextBooks;
        this.preRequisites = preRequisites;
        this.title = title;
        this.instructor = teacher;
    }

}
