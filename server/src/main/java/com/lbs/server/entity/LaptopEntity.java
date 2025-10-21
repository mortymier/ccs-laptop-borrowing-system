package com.lbs.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_laptops")
public class LaptopEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "laptopid")
    private Long id;

    private String brand;
    private String model;
    private String ram;
    private String cpu;
    private String storage;
    private double price;

    @Lob
    @Column(name = "photo_file", columnDefinition = "LONGBLOB")
    private byte[] photoFile;

    @Enumerated(EnumType.STRING)
    private LaptopStatus laptopstatus;

    public enum LaptopStatus { AVAILABLE, BORROWED, REPAIR }

    public LaptopEntity() { super(); }

    public LaptopEntity(Long id, String brand, String model, String ram, String cpu, String storage, double price, LaptopStatus laptopstatus)
    {
        super();
        this.id = id;
        this.brand = brand;
        this.model = model;
        this.ram = ram;
        this.cpu = cpu;
        this.storage = storage;
        this.price = price;
        this.laptopstatus = laptopstatus;
    }

    // Automatically set laptop status to available once a new laptop is added
    @PrePersist
    public void onCreate()
    {
        laptopstatus = LaptopStatus.AVAILABLE;
    }

    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }

    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }

    public String getRam() { return ram; }
    public void setRam(String ram) { this.ram = ram; }

    public String getCpu() { return cpu; }
    public void setCpu(String cpu) { this.cpu = cpu; }

    public String getStorage() { return storage; }
    public void setStorage(String storage) { this.storage = storage; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public LaptopStatus getLaptopstatus() { return laptopstatus; }
    public void setLaptopstatus(LaptopStatus laptopstatus) { this.laptopstatus = laptopstatus; }

    public byte[] getPhotoFile() { return photoFile; }
    public void setPhotoFile(byte[] photoFile) { this.photoFile = photoFile; }
}
