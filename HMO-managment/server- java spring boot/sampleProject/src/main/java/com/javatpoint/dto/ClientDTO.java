package com.javatpoint.dto;

import com.javatpoint.model.Address;
import com.javatpoint.model.Covid;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class ClientDTO {
    private Long id;
    private  String firstName;
    private String lastName;
    private String identity;
    private LocalDate birthDate;
    private String phoneNUmber;
    private String cellularNumber;
    private String img;
    private Address address;
    private Covid memberCovid;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public LocalDate getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(LocalDate birthDate) {
        this.birthDate = birthDate;
    }

    public String getPhoneNUmber() {
        return phoneNUmber;
    }

    public void setPhoneNUmber(String phoneNUmber) {
        this.phoneNUmber = phoneNUmber;
    }

    public String getCellularNumber() {
        return cellularNumber;
    }

    public void setCellularNumber(String cellularNumber) {
        this.cellularNumber = cellularNumber;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Covid getMemberCovid() {
        return memberCovid;
    }

    public void setMemberCovid(Covid memberCovid) {
        this.memberCovid = memberCovid;
    }
}
