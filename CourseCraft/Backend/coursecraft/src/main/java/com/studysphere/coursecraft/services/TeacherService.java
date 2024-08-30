package com.studysphere.coursecraft.services;

import com.studysphere.coursecraft.models.Teacher;
import com.studysphere.coursecraft.repositories.TeacherRepository;
import com.studysphere.coursecraft.utils.CourseCraftUtils;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TeacherService {
    @Autowired
    private TeacherRepository teacherRepository;

    public Optional<Teacher> getTeacher(String username){
        return teacherRepository.findTeacherByUsername(username);
    }

    public Optional<Teacher> getTeacherById(ObjectId id) {return teacherRepository.findById(id);}
    public Teacher createTeacher(String username, String email, String password, String mobileNo, String firstname, String lastname, String profilePicture, String qualification){
        String hashedPassword = CourseCraftUtils.hashPassword(password);
        String teacherId = new ObjectId().toString();
        Teacher teacher = teacherRepository.insert(new Teacher(teacherId, username, email, hashedPassword, mobileNo, firstname, lastname, profilePicture, qualification));
        return new Teacher(teacher.getTeacherId(), teacher.getUsername(), teacher.getEmail(), teacher.getMobileNo(), teacher.getFirstname(), teacher.getLastname(), profilePicture, teacher.getQualification());
    }

    public Optional<Teacher> loginTeacher(String username, String password){
        Optional<Teacher> teacher = teacherRepository.findTeacherByUsername(username);
        if(teacher.isPresent()){
            if(CourseCraftUtils.matchPassword(password, teacher.get().getPassword())){
                return Optional.of(new Teacher(teacher.get().getTeacherId(), teacher.get().getUsername(), teacher.get().getEmail(), teacher.get().getMobileNo(), teacher.get().getFirstname(), teacher.get().getLastname(), teacher.get().getProfilePicture(), teacher.get().getQualification()));
            }
        }
        return Optional.empty();
    }
}
