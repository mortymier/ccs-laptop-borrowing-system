package com.lbs.server.repository;

import com.lbs.server.entity.ScheduleEntity;
import com.lbs.server.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long>
{
    // Find all schedules belonging to a specific student
    List<ScheduleEntity> findByStudent(StudentEntity student);
    
    // Find by course and student
    Optional<ScheduleEntity> findByCourseAndStudent(String course, StudentEntity student);
}
