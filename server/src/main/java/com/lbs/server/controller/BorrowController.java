package com.lbs.server.controller;

import com.lbs.server.entity.BorrowEntity;
import com.lbs.server.entity.StudentEntity;
import com.lbs.server.service.BorrowService;
import com.lbs.server.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/borrows")
public class BorrowController
{
    @Autowired
    private BorrowService borrowService;

    @Autowired
    private StudentService studentService;

    // POST : Add new borrow record
    @PostMapping("/{studentid}/{laptopid}/{scheduleid}")
    public ResponseEntity<BorrowEntity> addBorrowRecord(@PathVariable Long studentid, @PathVariable Long laptopid, @PathVariable Long scheduleid, @RequestBody BorrowEntity borrow)
    {
        BorrowEntity newBorrow = borrowService.addBorrowRecord(studentid, laptopid, scheduleid, borrow);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newBorrow);
    }

    // GET : All borrow records based on a specific borrow status (staff view)
    @GetMapping("/status")
    public ResponseEntity<List<BorrowEntity>> getAllBorrowsByStatus(@RequestParam BorrowEntity.BorrowStatus borrowstatus)
    {
        List<BorrowEntity> borrows = borrowService.getAllBorrowsByStatus(borrowstatus);
        return ResponseEntity.ok(borrows);
    }

    // GET : All borrow records from a specific student with a specific borrow status
    @GetMapping("/status-student/{studentid}")
    public ResponseEntity<List<BorrowEntity>> getAllBorrowsByStudentAndStatus(@PathVariable Long studentid, @RequestParam BorrowEntity.BorrowStatus borrowstatus)
    {
        List<BorrowEntity> borrows = new ArrayList<>();
        Optional<StudentEntity> student = studentService.getStudentById(studentid);
        ResponseEntity response = ResponseEntity.status(401).body("Student does not exist");

        if(student.isPresent())
        {
            borrows = borrowService.getAllBorrowsByStudentAndStatus(student.get(), borrowstatus);
            response = ResponseEntity.ok(borrows);
        }

        return response;
    }

    // PUT : Update borrow status
    @PutMapping("/status-update/{newStatus}")
    public ResponseEntity<BorrowEntity> updateBorrowStatus(@PathVariable BorrowEntity.BorrowStatus newStatus, @RequestBody BorrowEntity updatedBorrow)
    {
        try
        {
            BorrowEntity temp = borrowService.updateBorrowStatus(newStatus, updatedBorrow);
            return ResponseEntity.ok(temp);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
