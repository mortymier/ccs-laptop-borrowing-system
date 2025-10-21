package com.lbs.server.controller;

import com.lbs.server.entity.LaptopEntity;
import com.lbs.server.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/laptops")
public class LaptopController
{
    @Autowired
    private LaptopService laptopService;

    // POST : Add new laptop
    @PostMapping
    public ResponseEntity<LaptopEntity> addLaptop(@RequestBody LaptopEntity laptop)
    {
        LaptopEntity newLaptop = laptopService.addLaptop(laptop);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest().buildAndExpand().toUri();
        return ResponseEntity.created(location).body(newLaptop);
    }

    // GET : All laptops
    @GetMapping
    public ResponseEntity<List<LaptopEntity>> getAllLaptops()
    {
        List<LaptopEntity> laptops = laptopService.getAllLaptops();
        return ResponseEntity.ok(laptops);
    }

    // PUT : Update laptop status
    @PutMapping("/{newStatus}")
    public ResponseEntity<LaptopEntity> updateLaptopStatus(@PathVariable LaptopEntity.LaptopStatus newStatus, @RequestBody LaptopEntity updatedLaptop)
    {
        try
        {
            LaptopEntity temp = laptopService.updateLaptopStatus(newStatus, updatedLaptop);
            return ResponseEntity.ok(temp);
        }
        catch(Exception e)
        {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    
    @PutMapping("/return/{id}")
public ResponseEntity<LaptopEntity> returnLaptop(@PathVariable Long id)
{
    try
    {
        LaptopEntity returnedLaptop = laptopService.returnLaptop(id);
        return ResponseEntity.ok(returnedLaptop);
    }
    catch(Exception e)
    {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
}
