package com.javatpoint.controller;

import com.javatpoint.model.Vaccine;
import com.javatpoint.service.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vaccine")
@CrossOrigin
public class VaccineController {
    private VaccineRepository vaccineRepository;
@Autowired
    public VaccineController(VaccineRepository vaccineRepository) {
        this.vaccineRepository = vaccineRepository;
    }

}
