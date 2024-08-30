package com.studysphere.coursecraft.repositories;

import com.studysphere.coursecraft.models.Course;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface CourseRepository extends MongoRepository<Course, ObjectId> {
    @Query(value = "{}", fields = "{ '_id': 0, 'field1': 1, 'field2': 1 }")
    List<Course> findAllWithCustomConstructor();
}
