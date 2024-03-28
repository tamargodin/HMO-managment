package com.javatpoint.service;

import com.javatpoint.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface ClientRepository extends JpaRepository<Client,Long> {
    Optional<Client> findById(Long id);

    @Query("SELECT COUNT(m) FROM Client m WHERE m.memberCovid IS NOT NULL AND SIZE(m.memberCovid.vaccinations) = 0")
    long countNonVaccinatedMembers();

}
