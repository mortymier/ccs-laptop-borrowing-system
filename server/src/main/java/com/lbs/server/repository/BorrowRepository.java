package com.lbs.server.repository;

import com.lbs.server.entity.BorrowEntity;
import com.lbs.server.entity.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BorrowRepository extends JpaRepository<BorrowEntity, Long>
{
    // Find all borrow records with a specific borrow status
    List<BorrowEntity> findByBorrowstatus(BorrowEntity.BorrowStatus borrowstatus);

    // Find all borrow records from a specific student with a specific borrow status
    List<BorrowEntity> findByStudentAndBorrowstatus(StudentEntity student, BorrowEntity.BorrowStatus borrowstatus);
}
