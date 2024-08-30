package com.studysphere.coursecraft.repositories;

import com.studysphere.coursecraft.models.Teacher;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TeacherRepository extends MongoRepository<Teacher, ObjectId> {
    Optional<Teacher> findTeacherByUsername(String username);
}
