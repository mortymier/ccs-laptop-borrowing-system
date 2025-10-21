package com.lbs.server.service;

import com.lbs.server.entity.BorrowEntity;
import com.lbs.server.entity.LaptopEntity;
import com.lbs.server.entity.StudentEntity;
import com.lbs.server.repository.BorrowRepository;
import com.lbs.server.repository.LaptopRepository;
import com.lbs.server.repository.ScheduleRepository;
import com.lbs.server.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.naming.NameNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.NoSuchElementException;

@Service
public class BorrowService {
    @Autowired
    private BorrowRepository borrowRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private LaptopRepository laptopRepository;

    @Autowired
    private ScheduleRepository scheduleRepository;

    // Add new borrow record
    public BorrowEntity addBorrowRecord(Long studentid, Long laptopid, Long scheduleid, BorrowEntity borrow) {
        borrow.setStudent(studentRepository.findById(studentid).get());
        borrow.setLaptop(laptopRepository.findById(laptopid).get());
        borrow.setSchedule(scheduleRepository.findById(scheduleid).get());
        return borrowRepository.save(borrow);
    }

    // Add new borrow record using student email, schedule course, laptop brand, and
    // model
    public BorrowEntity addBorrowRecord2(String email, String course, String brand, String model, BorrowEntity borrow) {
        Optional<StudentEntity> student = studentRepository.findByEmail(email);
        borrow.setStudent(student.get());
        borrow.setSchedule(scheduleRepository.findByCourseAndStudent(course, student.get()).get());
        borrow.setLaptop(laptopRepository.findByBrandAndModel(brand, model).get());
        return borrowRepository.save(borrow);
    }

    // Get all borrow records based on a specific borrow status
    public List<BorrowEntity> getAllBorrowsByStatus(BorrowEntity.BorrowStatus borrowstatus) {
        return borrowRepository.findByBorrowstatus(borrowstatus);
    }

    // Get all borrow records from a specific student with a specific borrow status
    public List<BorrowEntity> getAllBorrowsByStudentAndStatus(StudentEntity student,
            BorrowEntity.BorrowStatus borrowstatus) {
        return borrowRepository.findByStudentAndBorrowstatus(student, borrowstatus);
    }

    // Update borrow status
    public BorrowEntity updateBorrowStatus(BorrowEntity.BorrowStatus newStatus, BorrowEntity updatedBorrow) {
        BorrowEntity temp = new BorrowEntity();

        try {
            StudentEntity student = studentRepository.findByEmail(updatedBorrow.getStudent().getEmail()).get();
            String brand = updatedBorrow.getLaptop().getBrand();
            String model = updatedBorrow.getLaptop().getModel();
            LaptopEntity laptop = laptopRepository.findByBrandAndModel(brand, model).get();
            temp = borrowRepository.findByStudentAndLaptop(student, laptop).get();
            temp.setBorrowstatus(newStatus);
        } catch (NoSuchElementException e) {
            throw new NameNotFoundException("Borrow record does not exist!");
        } finally {
            return borrowRepository.save(temp);
        }
    }
}
