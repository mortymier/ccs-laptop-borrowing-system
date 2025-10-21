package com.lbs.server.controller;

import com.lbs.server.entity.ScheduleEntity;
import com.lbs.server.entity.StudentEntity;
import com.lbs.server.service.ScheduleService;
import com.lbs.server.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/schedules")
public class ScheduleController
{
    @Autowired
    private ScheduleService scheduleService;

    @Autowired
    private StudentService studentService;

    // POST : Add new schedule for a specific student using email
    @PostMapping("/student")
    public ResponseEntity<ScheduleEntity> addSchedule(@RequestParam String email, @RequestBody ScheduleEntity schedule)
    {
        ScheduleEntity newSchedule = scheduleService.addScheduleByEmail(email, schedule);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newSchedule);
    }

    // GET : All schedules of a specific student by email
    @GetMapping("/student")
    public ResponseEntity<List<ScheduleEntity>> getAllSchedulesByStudents(@RequestParam String email)
    {
        List<ScheduleEntity> schedules = new ArrayList<>();
        Optional<StudentEntity> student = studentService.getStudentByEmail(email);
        ResponseEntity response = ResponseEntity.status(401).body("Student does not exist");

        if(student.isPresent())
        {
            schedules = scheduleService.getAllSchedulesByStudent(student.get());
            response = ResponseEntity.ok(schedules);
        }

        return response;
    }
}
