package com.aim.service;

import com.aim.model.Student;
import com.aim.model.User;
import com.aim.model.enums.Role;
import com.aim.repository.StudentRepository;
import com.aim.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Random;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    public Student enrollStudent(String name, String email, String enrollmentData, String batch) {
        // 1. Check if email exists
        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // 2. Generate Password
        String rawPassword = generateRandomPassword();

        // 3. Create User
        User user = new User(name, email, encoder.encode(rawPassword));
        user.setRoles(Collections.singleton(Role.ROLE_STUDENT));
        user = userRepository.save(user);

        // 4. Generate Student ID
        String studentId = generateStudentId();

        // 5. Create Student
        Student student = new Student(studentId, user.getId(), enrollmentData, batch);
        studentRepository.save(student);

        // 6. Print to Console (as requested)
        System.out.println("=== STUDENT ENROLLED ===");
        System.out.println("ID: " + studentId);
        System.out.println("Email: " + email);
        System.out.println("Password: " + rawPassword);
        System.out.println("========================");

        return student;
    }

    private String generateRandomPassword() {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 8; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    private String generateStudentId() {
        // Simple logic: AIM-YEAR-RANDOM
        return "AIM-2024-" + (1000 + new Random().nextInt(9000));
    }
}
