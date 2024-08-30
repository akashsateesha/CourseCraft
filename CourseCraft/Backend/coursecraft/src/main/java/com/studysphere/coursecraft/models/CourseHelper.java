package com.studysphere.coursecraft.models;

import java.util.List;

public class CourseHelper {
    private final String title;
    private final String duration;
    private final String description;
    private final List<String> preRequisites;
    private final List<String> referenceTextBooks;
    private final String instructorId;

    CourseHelper(String title, String duration, String description, List<String> preRequisites, List<String> referenceTextBooks, String instructorId){
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.instructorId = instructorId;
        this.preRequisites = preRequisites;
        this.referenceTextBooks = referenceTextBooks;
    }

    public String getTitle() {
        return this.title;
    }

    public String getDuration() {
        return this.duration;
    }

    public String getDescription() {
        return this.description;
    }

    public List<String> getPreRequisites() {
        return this.preRequisites;
    }

    public List<String> getReferenceTextBooks() {
        return this.referenceTextBooks;
    }

    public String getInstructorId() {
        return this.instructorId;
    }
}
