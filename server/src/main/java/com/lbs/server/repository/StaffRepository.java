package com.lbs.server.repository;

import com.lbs.server.entity.StaffEntity;
import com.lbs.server.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StaffRepository extends JpaRepository<StaffEntity, Long>
{
    Optional<StudentEntity> findByEmailAndPassword(String email, String password);
}
