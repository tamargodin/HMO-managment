package com.javatpoint.model;


import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Client {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = " First Name is mandatory")
    private  String firstName;
    @NotNull(message = " last Name is mandatory")
    private String lastName;
    @NotNull(message = "Identity is mandatory")
    @Size(max = 9,min = 9)
    private String identity;
    @NotNull(message = "Name is mandatory")
    @Past(message = "birth Date must be in the past")
    private LocalDate birthDate;

    @Size(max = 10,min = 9, message = "Phone1 number must be between 9 and 10 characters")
    private String phoneNUmber;
    @Size(max = 10,min = 9, message = "Phone number must be between 9 and 10 characters")
    private String cellularNumber;
    private String img;


    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id", referencedColumnName = "id")
    private Address address;



    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "covid_id", referencedColumnName = "id")
    private Covid memberCovid;

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

    public Client(Long id, String firstName, String lastName, String identity, LocalDate birthDate, String phoneNUmber, String cellularNumber, String img,Address address,Covid covid) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.identity = identity;
        this.birthDate = birthDate;
        this.phoneNUmber = phoneNUmber;
        this.cellularNumber = cellularNumber;
        this.img = img;
        this.address=address;
        this.memberCovid=covid;
    }

    public Client() {

    }

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
}
