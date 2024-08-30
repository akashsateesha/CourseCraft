package com.studysphere.coursecraft.utils;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.studysphere.coursecraft.models.FileData;
import org.apache.commons.io.IOUtils;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CourseCraftUtils {

    public static String hashPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.encode(password);
    }

    public static boolean matchPassword(String password, String hashedPassword){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        return encoder.matches(password, hashedPassword);
    }

    public static String addFile(GridFsTemplate template, MultipartFile upload) throws IOException {

        DBObject metadata = new BasicDBObject();
        metadata.put("fileSize", upload.getSize());

        return template.store(upload.getInputStream(), upload.getOriginalFilename(), upload.getContentType(), metadata).toString();
    }

    public static List<String> addMultipleFiles(GridFsTemplate template, MultipartFile[] files) throws IOException {

        List<String> courseFiles = new ArrayList<>(Collections.emptyList());
        try {
            for (MultipartFile file : files) {
                DBObject metadata = new BasicDBObject();
                metadata.put("fileSize", file.getSize());
                ObjectId fileId = template.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType(), metadata);
                courseFiles.add(fileId.toString());
            }

            return courseFiles;
        } catch (IOException e) {
            return courseFiles;
        }
    }

    public static FileData downloadFile(GridFsTemplate template, GridFsOperations operations, String id) throws IOException {

        GridFSFile gridFSFile = template.findOne( new Query(Criteria.where("_id").is(id)) );

        FileData file = new FileData();

        if (gridFSFile != null && gridFSFile.getMetadata() != null) {
            file.setFilename( gridFSFile.getFilename() );

            file.setFileType( gridFSFile.getMetadata().get("_contentType").toString() );

            file.setFileSize( gridFSFile.getMetadata().get("fileSize").toString() );

            file.setFile( IOUtils.toByteArray(operations.getResource(gridFSFile).getInputStream()) );
        }

        return file;
    }
}
