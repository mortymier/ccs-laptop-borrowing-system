package com.lbs.server.service;

import com.lbs.server.entity.StudentEntity;
import com.lbs.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StudentService
{
    @Autowired
    private StudentRepository studentRepository;

    // Register student
    public StudentEntity registerStudent(StudentEntity student)
    {
        return studentRepository.save(student);
    }

    // Login student
    public Optional<StudentEntity> loginStudent(String email, String password)
    {
        return studentRepository.findByEmailAndPassword(email, password);
    }

    // Get student by id
    public Optional<StudentEntity> getStudentById(Long id)
    {
        return studentRepository.findById(id);
    }

    // Get student by email
    public Optional<StudentEntity> getStudentByEmail(String email)
    {
        return studentRepository.findByEmail(email);
    }
}
