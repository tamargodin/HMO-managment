package com.javatpoint.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
public class Vaccine {
    @Id
    @GeneratedValue
    private Long id;
    private String manufacturerName;
    private LocalDate date;

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Covid getCovid() {
        return covid;
    }

    public void setCovid(Covid covid) {
        this.covid = covid;
    }

@JsonIgnore
    @ManyToOne
    @JoinColumn(name="covid_id")
    private Covid covid;
    public Vaccine(Long id, String manufacturerName,Covid covid,LocalDate date) {
        this.id = id;
        this.manufacturerName = manufacturerName;
        this.covid=covid;
        this.date=date;
    }

    public Vaccine() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getManufacturerName() {
        return manufacturerName;
    }

    public void setManufacturerName(String manufacturerName) {
        this.manufacturerName = manufacturerName;
    }


}
