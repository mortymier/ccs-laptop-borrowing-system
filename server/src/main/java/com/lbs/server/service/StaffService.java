package com.lbs.server.service;

import com.lbs.server.entity.StaffEntity;
import com.lbs.server.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StaffService
{
    @Autowired
    private StaffRepository staffRepository;

    public StaffService() { super(); }

    // Register student
    public StaffEntity registerStaff(StaffEntity staff)
    {
        return staffRepository.save(staff);
    }

    // Login student
    public Optional<StaffEntity> loginStaff(String email, String password)
    {
        return staffRepository.findByEmailAndPassword(email, password);
    }
}
