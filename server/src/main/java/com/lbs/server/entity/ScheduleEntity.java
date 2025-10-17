package com.lbs.server.entity;

import jakarta.persistence.*;
import java.time.LocalTime;

@Entity
@Table(name = "tbl_schedules")
public class ScheduleEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "scheduleid")
    private Long id;

    private String course;
    private String section;
    private String schoolyear;
    private String semester;

    private LocalTime start;
    private LocalTime end;

    @ManyToOne
    @JoinColumn(name = "fk_studentid")
    private StudentEntity student;

    public ScheduleEntity() { super(); }

    public ScheduleEntity(Long id, String course, String section, String schoolyear, String semester, LocalTime start, LocalTime end, StudentEntity student)
    {
        super();
        this.id = id;
        this.course = course;
        this.section = section;
        this.schoolyear = schoolyear;
        this.semester = semester;
        this.start = start;
        this.end = end;
        this.student = student;
    }

    public String getCourse() { return course; }
    public void setCourse(String course) { this.course = course; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public String getSchoolyear() { return schoolyear; }
    public void setSchoolyear(String schoolyear) { this.schoolyear = schoolyear; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public LocalTime getStart() { return start; }
    public void setStart(LocalTime start) { this.start = start; }

    public LocalTime getEnd() { return end; }
    public void setEnd(LocalTime end) { this.end = end; }

    public StudentEntity getStudent() { return student; }
    public void setStudent(StudentEntity student) { this.student = student; }
}
