package com.aim.controller;

import com.aim.model.Student;
import com.aim.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sales")
@PreAuthorize("hasAnyRole('SALES', 'ADMIN')")
public class SalesController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/enroll")
    public ResponseEntity<?> enrollStudent(@RequestBody EnrollRequest request) {
        try {
            Student student = studentService.enrollStudent(
                    request.getName(),
                    request.getEmail(),
                    request.getEnrollmentData(),
                    request.getBatch());
            return ResponseEntity.ok(student);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // DTO for enrollment
    public static class EnrollRequest {
        private String name;
        private String email;
        private String enrollmentData;
        private String batch;

        // Getters and Setters
        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getEnrollmentData() {
            return enrollmentData;
        }

        public void setEnrollmentData(String enrollmentData) {
            this.enrollmentData = enrollmentData;
        }

        public String getBatch() {
            return batch;
        }

        public void setBatch(String batch) {
            this.batch = batch;
        }
    }
}
