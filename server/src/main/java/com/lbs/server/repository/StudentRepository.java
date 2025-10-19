package com.lbs.server.repository;

import com.lbs.server.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long>
{
    Optional<StudentEntity> findByEmail(String email);
    Optional<StudentEntity> findByEmailAndPassword(String email, String password);
}
