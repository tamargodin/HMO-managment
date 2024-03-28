package com.javatpoint.service;

import com.javatpoint.model.Covid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public interface CovidRepository extends JpaRepository<Covid,Long> {

    @Query("SELECT c.positiveResultDate, COUNT(c) FROM Covid c WHERE c.positiveResultDate BETWEEN :startDate AND :endDate GROUP BY c.positiveResultDate")
    List<Object[]> getActiveCasesPerDayLastMonth(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);

    int countByPositiveResultDateBeforeAndRecoveryDateAfter(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate);


}

