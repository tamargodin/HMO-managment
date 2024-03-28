package com.javatpoint.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Address {
    @Id
    @GeneratedValue
    private Long id;

    private String city;
    private String Street;
    private  int houseNumber;

    @JsonIgnore
    @OneToOne(mappedBy = "address" ,cascade = CascadeType.ALL)
    private  Client client;

    public Address(Long id, String city, String street,int houseNumber) {
        this.id = id;
        this.city = city;
        Street = street;
        this.houseNumber=houseNumber;

    }

    public int getHouseNumber() {
        return houseNumber;
    }

    public void setHouseNumber(int houseNumber) {
        this.houseNumber = houseNumber;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getStreet() {
        return Street;
    }

    public void setStreet(String street) {
        Street = street;
    }




    public Address() {

    }
}
