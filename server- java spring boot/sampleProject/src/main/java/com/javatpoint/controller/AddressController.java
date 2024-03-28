package com.javatpoint.controller;

import com.javatpoint.service.AddressRepositpry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/address")
@CrossOrigin
public class AddressController {

    private AddressRepositpry addressRepositpry;

    @Autowired

    public AddressController(AddressRepositpry addressRepositpry) {
        this.addressRepositpry = addressRepositpry;
    }
}
