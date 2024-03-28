package com.javatpoint.service;

import com.javatpoint.model.Vaccine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface VaccineRepository extends JpaRepository<Vaccine,Long> {
}
