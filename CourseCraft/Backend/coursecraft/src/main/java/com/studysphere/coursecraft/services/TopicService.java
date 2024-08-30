package com.studysphere.coursecraft.services;

import com.studysphere.coursecraft.models.Topic;
import com.studysphere.coursecraft.repositories.TopicRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;

    public Topic createTopic(String topicName, List<String> content){
        String topicId = new ObjectId().toString();
        return topicRepository.insert(new Topic(topicId, topicName, content));
    }
}
