package com.javatpoint.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Entity
public class Covid {

    @Id
    @GeneratedValue
    private Long id;


    @Past(message = "positiveResultDate must be in the past")
    private LocalDate positiveResultDate;
    @Past(message = "recoveryDate must be in the past")
    private LocalDate recoveryDate;

    @JsonIgnore
    @OneToOne(mappedBy = "memberCovid", cascade = CascadeType.ALL)
    private Client client;

    @OneToMany(mappedBy = "covid", cascade = CascadeType.ALL)
    @Size(max = 4)
    private List<Vaccine> vaccinations;

    public Covid(Long id, LocalDate positiveResultDate, LocalDate recoveryDate, Client client, List<Vaccine> vaccinations) {
        this.id = id;
        this.positiveResultDate = positiveResultDate;
        this.recoveryDate = recoveryDate;
        this.client = client;
        this.vaccinations = vaccinations;
    }

    public Covid() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getPositiveResultDate() {
        return positiveResultDate;
    }

    public void setPositiveResultDate(LocalDate positiveResultDate) {
        this.positiveResultDate = positiveResultDate;
    }

    public LocalDate getRecoveryDate() {
        return recoveryDate;
    }

    public void setRecoveryDate(LocalDate recoveryDate) {
        this.recoveryDate = recoveryDate;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public List<Vaccine> getVaccinations() {
        return vaccinations;
    }

    public void setVaccinations(List<Vaccine> vaccinations) {
        this.vaccinations = vaccinations;
    }
}
