package com.lbs.server.service;

import com.lbs.server.entity.StaffEntity;
import com.lbs.server.repository.StaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class StaffService {
    @Autowired
    private StaffRepository staffRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register staff (hash password)
    public StaffEntity registerStaff(StaffEntity staff) {
        staff.setPassword(passwordEncoder.encode(staff.getPassword()));
        return staffRepository.save(staff);
    }

    // Login staff (compare hashed password)
    public Optional<StaffEntity> loginStaff(String email, String rawPassword) {
        Optional<StaffEntity> staffOpt = staffRepository.findByEmail(email);

        if (staffOpt.isPresent()) {
            StaffEntity staff = staffOpt.get();

            if (passwordEncoder.matches(rawPassword, staff.getPassword())) {
                return Optional.of(staff);
            }
        }

        return Optional.empty();
    }
}
