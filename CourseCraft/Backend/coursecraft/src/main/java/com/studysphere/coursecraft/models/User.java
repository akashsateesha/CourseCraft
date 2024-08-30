package com.studysphere.coursecraft.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Optional;


public class User {

    protected String username;
    protected String password;
    protected String email;
    protected String mobileNo;
    protected String firstname;
    protected String lastname;

    protected String profilePicture;

    public User(){}

    public User(String username, String email, String password, String mobileNo, String firstname, String lastname, String profilePicture){
        this.username = username;
        this.password = password;
        this.email = email;
        this.mobileNo = mobileNo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.profilePicture = profilePicture;
    }

    public User(String username, String email, String mobileNo, String firstname, String lastname, String profilePicture){
        this.username = username;
        this.email = email;
        this.mobileNo = mobileNo;
        this.firstname = firstname;
        this.lastname = lastname;
        this.profilePicture = profilePicture;
    }

    public String getUsername(){
        return this.username;
    }
    public String getEmail(){
        return this.email;
    }
    public String getMobileNo(){
        return this.mobileNo;
    }
    public String getFirstname(){
        return this.firstname;
    }
    public String getLastname(){
        return this.lastname;
    }
    public String getPassword(){
        return this.password;
    }
    public String getProfilePicture(){
        return this.profilePicture;
    }
}
