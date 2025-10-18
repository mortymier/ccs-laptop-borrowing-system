package com.lbs.server.service;

import com.lbs.server.entity.ScheduleEntity;
import com.lbs.server.entity.StudentEntity;
import com.lbs.server.repository.ScheduleRepository;
import com.lbs.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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

    // Get all schedules belonging to a specific student
    public List<ScheduleEntity> getAllSchedulesByStudent(StudentEntity student)
    {
        return scheduleRepository.findByStudent(student);
    }
}
