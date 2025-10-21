package com.lbs.server.service;

import com.lbs.server.entity.StudentEntity;
import com.lbs.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register student (hash password)
    public StudentEntity registerStudent(StudentEntity student) {
        // Hash the raw password before saving
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentRepository.save(student);
    }

    // Login student (compare hashed password)
    public Optional<StudentEntity> loginStudent(String email, String rawPassword) {
        Optional<StudentEntity> studentOpt = studentRepository.findByEmail(email);

        if (studentOpt.isPresent()) {
            StudentEntity student = studentOpt.get();

            if (passwordEncoder.matches(rawPassword, student.getPassword())) {
                return Optional.of(student);
            }
        }

        return Optional.empty(); // invalid credentials
    }

    // Get student by id
    public Optional<StudentEntity> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    // Get student by email
    public Optional<StudentEntity> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
}
