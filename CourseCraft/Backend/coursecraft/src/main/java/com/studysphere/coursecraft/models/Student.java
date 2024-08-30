package com.studysphere.coursecraft.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.ArrayList;
import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "students")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Student extends User{
    @Id
    private String studentId;

    @DocumentReference
    private List<Course> enrolledCourses;

    public Student(String studentId, String username, String email, String mobileNo, String firstname, String lastname, String profilePicture){
        super(username, email, mobileNo, firstname, lastname, profilePicture);
        this.studentId = studentId;
        this.enrolledCourses = new ArrayList<>(); // this should not be an empty list
        this.profilePicture = profilePicture;
    }

    public Student(String studentId, String username, String email, String password, String mobileNo, String firstname, String lastname, String profilePicture) {
        super(username, email, mobileNo, firstname, lastname, profilePicture);
        this.studentId = studentId;
        this.enrolledCourses = new ArrayList<>(); // this should not be an empty list
        this.profilePicture = profilePicture;
        this.password = password;
    }

    public String getUsername(){
        return super.getUsername();
    }
    public String getEmail(){
        return super.getEmail();
    }
    public String getMobileNo(){
        return super.getMobileNo();
    }
    public String getFirstname(){
        return super.getFirstname();
    }
    public String getLastname(){
        return super.getLastname();
    }
    public String getPassword(){
        return super.getPassword();
    }
    public String getProfilePicture(){
        return super.getProfilePicture();
    }

    public List<Course> enrolledCourses(){
        return this.enrolledCourses;
    }


}
