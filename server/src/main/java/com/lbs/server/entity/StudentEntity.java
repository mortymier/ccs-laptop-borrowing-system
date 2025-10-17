package com.lbs.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_students")
public class StudentEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "studentid")
    private Long id;

    private String firstname;
    private String lastname;

    @Column(unique = true)  // Prevent duplicate emails
    private String email;

    private String password;
    private String contactnum;
    private String program;
    private int yearlvl;

    public StudentEntity() { super(); }

    public StudentEntity(Long id, String firstname, String lastname, String email, String password, String contactnum, String program, int yearlvl)
    {
        super();
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.contactnum = contactnum;
        this.program = program;
        this.yearlvl = yearlvl;
    }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() {return password; }
    public void setPassword(String password) { this.password = password; }

    public String getContactnum() { return contactnum; }
    public void setContactnum(String contactnum)  { this.contactnum = contactnum; }

    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }

    public int getYearlvl() { return yearlvl; }
    public void setYearlvl(int yearlvl) { this.yearlvl = yearlvl; }
}
