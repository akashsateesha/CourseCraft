package com.studysphere.coursecraft.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Collections;

@EqualsAndHashCode(callSuper = true)
@Document(collection = "teachers")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Teacher extends User{
    @Id
    private String teacherId;
    private String qualification;

//    public Teacher(String username, String email, String password, String mobileNo, String firstname, String lastname, String profilePicture, String qualification){
//        super(username, email, password, mobileNo, firstname, lastname, profilePicture);
//        this.qualification = qualification;
//    }
//
//    public Teacher(String teacherId, String username, String email, String mobileNo, String firstname, String lastname, String profilePicture, String qualification){
//        super(username, email, mobileNo, firstname, lastname, profilePicture);
//        this.teacherId = teacherId;
//        this.profilePicture = profilePicture;
//        this.qualification = qualification;
//
//    }

    public Teacher(String teacherId, String username, String email, String password, String mobileNo, String firstname, String lastname, String profilePicture, String qualification) {
        super(username, email, password, mobileNo, firstname, lastname, profilePicture);
        this.teacherId = teacherId;
        this.qualification = qualification;
    }

    public Teacher(String teacherId, String username, String email, String mobileNo, String firstname, String lastname, String profilePicture, String qualification) {
        super(username, email, mobileNo, firstname, lastname, profilePicture);
        this.teacherId = teacherId;
        this.qualification = qualification;
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

    public String getQualification(){return this.qualification;}


}
