package com.aim.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "students")
public class Student {

    @Id
    private String id;

    // ===== LOGIN DETAILS =====
    private String username; // login id (AIM-001)
    private String password;
    private String name;
    private String image;

    // ===== SYSTEM DETAILS =====
    private String studentId; // AIM-2024-001
    private String userId; // Link to User table

    private String enrollmentData;
    private String assignedBatch;

    private LocalDateTime enrolledAt = LocalDateTime.now();

    public Student() {
    }

    public Student(String username, String password, String name, String assignedBatch) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.assignedBatch = assignedBatch;
    }

    // ===== GETTERS & SETTERS =====

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getStudentId() {
        return studentId;
    }

    public void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getEnrollmentData() {
        return enrollmentData;
    }

    public void setEnrollmentData(String enrollmentData) {
        this.enrollmentData = enrollmentData;
    }

    public String getAssignedBatch() {
        return assignedBatch;
    }

    public void setAssignedBatch(String assignedBatch) {
        this.assignedBatch = assignedBatch;
    }

    public LocalDateTime getEnrolledAt() {
        return enrolledAt;
    }

    public void setEnrolledAt(LocalDateTime enrolledAt) {
        this.enrolledAt = enrolledAt;
    }

}
