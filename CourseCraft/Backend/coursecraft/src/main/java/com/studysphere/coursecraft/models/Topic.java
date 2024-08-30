package com.studysphere.coursecraft.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "topics")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Topic {
    @Id
    private String topicId;
    private String topicName;
    private List<String> content;

//    public Topic(String topicId, String topicName, List<String> content) {
//        this.topicId = topicId;
//        this.content = content;
//        this.topicName = topicName;
//    }
}
