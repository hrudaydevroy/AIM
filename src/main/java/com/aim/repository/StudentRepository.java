package com.aim.repository;

import com.aim.model.Student;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StudentRepository extends MongoRepository<Student, String> {

    // 🔥 Student Login kosam (username + password check)
    Optional<Student> findByUsername(String username);

    // Existing mappings (future use)
    Optional<Student> findByStudentId(String studentId);

    Optional<Student> findByUserId(String userId);
}
