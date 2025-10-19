package com.lbs.server.controller;

import com.lbs.server.entity.StaffEntity;
import com.lbs.server.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/staffs")
public class StaffController
{
    @Autowired
    private StaffService staffService;

    // POST : Register staff
    @PostMapping("/register")
    public ResponseEntity<StaffEntity> registerStaff(@RequestBody StaffEntity staff)
    {
        StaffEntity newStaff = staffService.registerStaff(staff);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newStaff);
    }

    // POST : Login staff
    @PostMapping("/login")
    public ResponseEntity<StaffEntity> loginStaff(@RequestParam String email, @RequestParam String password)
    {
        Optional<StaffEntity> staff = staffService.loginStaff(email, password);
        ResponseEntity response = ResponseEntity.status(401).body("Invalid email or password");

        if(staff.isPresent())
        {
            response = ResponseEntity.ok(staff.get());
        }

        return response;
    }
}
