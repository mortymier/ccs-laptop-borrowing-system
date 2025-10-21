package com.lbs.server.service;

import com.lbs.server.entity.ScheduleEntity;
import com.lbs.server.entity.StudentEntity;
import com.lbs.server.repository.ScheduleRepository;
import com.lbs.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService
{
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private StudentRepository studentRepository;

    // Add new schedule
    public ScheduleEntity addSchedule(Long studentid, ScheduleEntity schedule)
    {
        schedule.setStudent(studentRepository.findById(studentid).get());
        return scheduleRepository.save(schedule);
    }

    // Add new schedule for a specific student using email
    public ScheduleEntity addScheduleByEmail(String email, ScheduleEntity schedule)
    {
        schedule.setStudent(studentRepository.findByEmail(email).get());
        return scheduleRepository.save(schedule);
    }

    // Get all schedules belonging to a specific student
    public List<ScheduleEntity> getAllSchedulesByStudent(StudentEntity student)
    {
        return scheduleRepository.findByStudent(student);
    }

    // Get all schedules beloging to a specific student using email
    public List<ScheduleEntity> getAllSchedulesByStudentEmail(String email)
    {
        Optional<StudentEntity> student = studentRepository.findByEmail(email);
        return scheduleRepository.findByStudent(student.get());
    }

    // Get specific schedule by course and student email
    public Optional<ScheduleEntity> getScheduleByCourseAndEmail(String course, String email)
    {
        Optional<StudentEntity> student = studentRepository.findByEmail(email);
        return scheduleRepository.findByCourseAndStudent(course, student.get());
    }
}
