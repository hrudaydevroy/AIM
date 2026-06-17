package com.aim.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import com.aim.model.Student;
import com.aim.repository.StudentRepository;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    @Autowired
    private StudentRepository repo;

    @GetMapping("/profile")
    public Student getProfile(Authentication auth) {

        String username = auth.getName();
        return repo.findByUsername(username).orElse(null);
    }
}
