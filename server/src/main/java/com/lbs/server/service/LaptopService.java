package com.lbs.server.service;

import com.lbs.server.entity.LaptopEntity;
import com.lbs.server.repository.LaptopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class LaptopService
{
    @Autowired
    private LaptopRepository laptopRepository;

    // Add new laptop
    public LaptopEntity addLaptop(LaptopEntity laptop)
    {
        return laptopRepository.save(laptop);
    }

    // Get all laptops
    public List<LaptopEntity> getAllLaptops()
    {
        return laptopRepository.findAll();
    }

    // Get all laptops based on status
    public List<LaptopEntity> getAllLaptopsByStatus(LaptopEntity.LaptopStatus laptopstatus)
    {
        return laptopRepository.findByLaptopstatus(laptopstatus);
    }

    // Get all laptops based on brand
    public List<LaptopEntity> getAllLaptopsByBrand(String brand)
    {
        return laptopRepository.findByBrand(brand);
    }

    // Get specific laptop based on brand and model
    public Optional<LaptopEntity> getLaptopByBrandAndModel(String brand, String model)
    {
        return laptopRepository.findByBrandAndModel(brand, model);
    }
}
