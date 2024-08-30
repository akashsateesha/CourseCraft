package com.studysphere.coursecraft.repositories;

import com.studysphere.coursecraft.models.Topic;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TopicRepository extends MongoRepository<Topic, ObjectId> {

}
