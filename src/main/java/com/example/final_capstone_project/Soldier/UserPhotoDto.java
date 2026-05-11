package com.example.final_capstone_project.Soldier;

import org.springframework.web.multipart.MultipartFile;

public class UserPhotoDto {
    private MultipartFile file; // Represents the uploaded image

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public MultipartFile getPhotoFile() {
        return file;
    }
}