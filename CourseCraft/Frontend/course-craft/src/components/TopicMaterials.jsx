import React from "react";
import Material from "./Material";

const TopicMaterials = ({ topic, index }) => {
  return (
    <div key={topic.topicName}>
      <h3>{index}. {topic.topicName}</h3>
      <div className="materials">
        {topic.content.map((file) => (
          <Material fileId={file} key={file} />
        ))}
      </div>
    </div>
  );
};

export default TopicMaterials;
