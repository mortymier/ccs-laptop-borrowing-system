package com.lbs.server.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tbl_borrows")
public class BorrowEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "borrowid")
    private Long id;

    private String reason;
    private LocalDate borrowdate;

    @Enumerated(EnumType.STRING)
    private BorrowStatus borrowstatus;

    public enum BorrowStatus { REVIEWING, APPROVED, REJECTED, RETURNED, OVERDUE, PENALTY }

    @ManyToOne
    @JoinColumn(name = "fk_studentid")
    private StudentEntity student;

    @ManyToOne
    @JoinColumn(name = "fk_laptopid")
    private LaptopEntity laptop;

    @ManyToOne
    @JoinColumn(name = "fk_scheduleid")
    private ScheduleEntity schedule;

    public BorrowEntity() { super(); }

    public BorrowEntity(Long id, String reason, LocalDate borrowdate, BorrowStatus borrowstatus, StudentEntity student, LaptopEntity laptop, ScheduleEntity schedule)
    {
        super();
        this.id = id;
        this.reason = reason;
        this.borrowdate = borrowdate;
        this.borrowstatus = borrowstatus;
        this.student = student;
        this.laptop = laptop;
        this.schedule = schedule;
    }

    // Automatically set borrow date once a new record is created
    @PrePersist
    public void onCreate() { borrowdate = LocalDate.now(); }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public LocalDate getBorrowdate() { return borrowdate; }
    public void setBorrowdate(LocalDate borrowdate) { this.borrowdate = borrowdate; }

    public BorrowStatus getBorrowstatus() { return borrowstatus; }
    public void setBorrowstatus(BorrowStatus borrowstatus) { this.borrowstatus = borrowstatus; }

    public StudentEntity getStudent() { return student; }
    public void setStudent(StudentEntity student) { this.student = student; }

    public LaptopEntity getLaptop() { return laptop; }
    public void setLaptop(LaptopEntity laptop) { this.laptop = laptop; }

    public ScheduleEntity getSchedule() { return schedule; }
    public void setSchedule(ScheduleEntity schedule) { this.schedule = schedule; }
}
