package com.lbs.server.controller;

import com.lbs.server.entity.StudentEntity;
import com.lbs.server.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/students")
public class StudentController
{
    @Autowired
    private StudentService studentService;

    // POST : Register student
    @PostMapping("/register")
    public ResponseEntity<StudentEntity> registerStudent(@RequestBody StudentEntity student)
    {
        StudentEntity newStudent = studentService.registerStudent(student);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newStudent);
    }

    // POST : Login student
    @PostMapping("/login")
    public ResponseEntity<StudentEntity> loginStudent(@RequestParam String email, @RequestParam String password)
    {
        Optional<StudentEntity> student = studentService.loginStudent(email, password);
        ResponseEntity response = ResponseEntity.status(401).body("Invalid email or password");

        if(student.isPresent())
        {
            response = ResponseEntity.ok(student.get());
        }

        return response;
    }
}
