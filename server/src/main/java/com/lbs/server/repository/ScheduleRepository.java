package com.lbs.server.repository;

import com.lbs.server.entity.ScheduleEntity;
import com.lbs.server.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long>
{
    // Find all schedules belonging to a specific student
    List<ScheduleEntity> findByStudent(StudentEntity student);
}
