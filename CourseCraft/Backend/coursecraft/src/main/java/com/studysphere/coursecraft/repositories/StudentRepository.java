package com.studysphere.coursecraft.repositories;

import com.studysphere.coursecraft.models.Course;
import com.studysphere.coursecraft.models.Student;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends MongoRepository<Student, ObjectId> {
    Optional<Student> findStudentByUsername(String username);
}
