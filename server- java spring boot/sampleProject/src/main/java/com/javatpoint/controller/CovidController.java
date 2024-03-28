package com.javatpoint.controller;


import com.javatpoint.model.Covid;
import com.javatpoint.model.Vaccine;
import com.javatpoint.service.CovidRepository;
import com.javatpoint.service.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@RestController
@RequestMapping("/api/covid")
@CrossOrigin
public class CovidController {
    private CovidRepository covidRepository;
    private VaccineRepository vaccineRepository;


    @Autowired
    public CovidController(CovidRepository covidRepository,VaccineRepository vaccineRepository) {
        this.covidRepository = covidRepository;
        this.vaccineRepository=vaccineRepository;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleValidationExceptions(
            MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return errors;
    }


    @PutMapping("/update/{id}")
    public ResponseEntity updateCorona(@PathVariable Long id, @RequestBody Covid covid) {
        try {
            Covid currentCovid = covidRepository.findById(id).orElse(null);
            if (currentCovid != null) {
                // Update the fields of the currentCovid with the fields from covid
                currentCovid.setRecoveryDate(covid.getRecoveryDate());
                currentCovid.setPositiveResultDate((covid.getPositiveResultDate()));
                currentCovid.setVaccinations(covid.getVaccinations());
                // Update the list of vaccinations
                List<Vaccine> updatedVaccineList = covid.getVaccinations();
                if (updatedVaccineList != null) {
                    // Set the covid reference for each vaccine in the updated list
                    updatedVaccineList.forEach(vaccine -> vaccine.setCovid(currentCovid));
                    currentCovid.setVaccinations(updatedVaccineList);
                }

                // Save the updated covid entity
                Covid savedCorona = covidRepository.save(currentCovid);
                return new ResponseEntity<>(savedCorona, HttpStatus.OK);
            } else {
                // covid with the given ID not found
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            // Internal server error occurred
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/active-cases-last-month")
    public Map<String, Integer> getActiveCasesLastMonth3() {
        // Calculate start and end dates for the last month
        LocalDate endDate = LocalDate.now().minusDays(1); // Last day of the previous month
        LocalDate startDate = endDate.minusMonths(1).plusDays(1); // First day of the previous month

        // Create a map to store active cases per day
        Map<String, Integer> activeCasesPerDayMap = new HashMap<>();

        // Iterate through each date in the range and retrieve the count
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            // Convert the current date to a string
            String dateStr = currentDate.toString();

            // Retrieve the count of active cases for the current date
            int count = covidRepository.countByPositiveResultDateBeforeAndRecoveryDateAfter(currentDate.plusDays(1), currentDate.minusDays(1));

            // Add the count to the map with the date as the key
            activeCasesPerDayMap.put(dateStr, count);

            // Move to the next date
            currentDate = currentDate.plusDays(1);
        }
        Map<String, Integer> sortedMap = new TreeMap<>(activeCasesPerDayMap);

        // Return the map containing counts for each date
        return sortedMap;
    }

}
