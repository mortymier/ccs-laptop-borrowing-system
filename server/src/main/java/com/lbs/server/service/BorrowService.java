package com.lbs.server.service;

import com.lbs.server.entity.BorrowEntity;
import com.lbs.server.entity.StudentEntity;
import com.lbs.server.repository.BorrowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BorrowService
{
    @Autowired
    private BorrowRepository borrowRepository;

    // Get all borrow records based on a specific borrow status
    public List<BorrowEntity> getAllBorrowsByStatus(BorrowEntity.BorrowStatus borrowstatus)
    {
        return borrowRepository.findByBorrowstatus(borrowstatus);
    }

    // Get all borrow records from a specific student with a specific borrow status
    public List<BorrowEntity> getAllBorrowsByStudentAndStatus(StudentEntity student, BorrowEntity.BorrowStatus borrowstatus)
    {
        return  borrowRepository.findByStudentAndBorrowstatus(student, borrowstatus);
    }
}
