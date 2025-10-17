package com.lbs.server.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tbl_staffs")
public class StaffEntity
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staffid")
    private Long id;

    private String firstname;
    private String lastname;

    @Column(unique = true)
    private String email;
    private String password;

    public StaffEntity() { super(); }

    public StaffEntity(Long id, String firstname, String lastname, String email, String password)
    {
        super();
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    public String getFirstname() { return firstname; }
    public void setFirstname(String firstname) { this.firstname = firstname; }

    public String getLastname() { return lastname; }
    public void setLastname(String lastname) { this.lastname = lastname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() {return password; }
    public void setPassword(String password) { this.password = password; }
}
