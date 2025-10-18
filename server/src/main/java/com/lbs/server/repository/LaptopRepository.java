package com.lbs.server.repository;

import com.lbs.server.entity.LaptopEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LaptopRepository extends JpaRepository<LaptopEntity, Long>
{
    // Find all laptops based on a 'laptopstatus' filter
    List<LaptopEntity> findByLaptopstatus(LaptopEntity.LaptopStatus laptopstatus);

    // Find all laptops based on a 'brand' filter
    List<LaptopEntity> findByBrand(String brand);
}
