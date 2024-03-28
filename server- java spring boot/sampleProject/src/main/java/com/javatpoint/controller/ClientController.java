package com.javatpoint.controller;

import com.javatpoint.dto.ClientDTO;
import com.javatpoint.model.Client;
import com.javatpoint.model.Covid;
import com.javatpoint.model.Vaccine;
import com.javatpoint.service.ClientRepository;
import com.javatpoint.service.CovidRepository;
import com.javatpoint.service.MapStructMapper;
import com.javatpoint.service.VaccineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clients")
@CrossOrigin
public class ClientController {
    private ClientRepository clientRepository;
    private CovidRepository covidRepository;

    private VaccineRepository vaccineRepository;
    private MapStructMapper mapper;


    @Autowired
    public ClientController(ClientRepository clientRepository, MapStructMapper mapper,CovidRepository covidRepository ,VaccineRepository vaccineRepository) {
        this.clientRepository = clientRepository;
        this.mapper=mapper;
        this.covidRepository=covidRepository;
        this.vaccineRepository=vaccineRepository;
    }

//validation exceptions function
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

    private  static String PATH_IMG=System.getProperty("user.dir")+"\\images\\";


    @GetMapping("get")
     public ResponseEntity<List<Client>> getClients(){
        try{
            List<Client> members=new ArrayList<>();
            clientRepository.findAll().forEach(m->members.add(m));
            System.out.println(members);
            return new ResponseEntity(members, HttpStatus.OK);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @PostMapping("/uploadMember2")
    public ResponseEntity<Client> uploadMember(@RequestPart("image") MultipartFile file,
                                               @RequestPart("client") Client c){
        try {
            String filePath = PATH_IMG + file.getOriginalFilename();
            Path filename= Paths.get(filePath);
            Files.write(filename,file.getBytes());
            c.setImg(filePath);
            Client newClient=clientRepository.save(c);
            return  new ResponseEntity(newClient,HttpStatus.CREATED);
        }
        catch (Exception e){
            System.out.println(e);
            return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

//get all DTO clients
     @GetMapping("getDTO")
    public ResponseEntity<List<ClientDTO>> getDTO(){
      try{
       List<Client> clients=new ArrayList<>();
        clientRepository.findAll().forEach(m->clients.add(m));
      System.out.println(clients);
      return new ResponseEntity(mapper.clientsToDTO(clients), HttpStatus.OK);
      }
      catch (Exception e){
          System.out.println(e);
           return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
         }
     }



    @PostMapping("/uploadMember")
    public ResponseEntity<Client> uploadMember2(@RequestPart("image") MultipartFile file,
                                                @RequestPart("client") Client c){
        try {
            // Save the Client entity first
            String filePath = PATH_IMG + file.getOriginalFilename();
            Path filename= Paths.get(filePath);
            Files.write(filename,file.getBytes());
            c.setImg(filePath);
            if(c.getBirthDate().isAfter(LocalDate.now())||c.getIdentity().length()!=9||c.getPhoneNUmber().length()!=9)
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            Client newClient = clientRepository.save(c);

            // Set the Client object for the Covid entity and save it
            Covid covid = c.getMemberCovid();
            if((covid.getPositiveResultDate()!=null&&covid.getPositiveResultDate().isAfter(LocalDate.now()))||(covid.getRecoveryDate()!=null&&covid.getPositiveResultDate().isAfter(LocalDate.now()))
                ||(covid.getPositiveResultDate()!=null&&covid.getRecoveryDate()!=null&&covid.getPositiveResultDate().isAfter(covid.getRecoveryDate())))
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
            covid.setClient(newClient);
            covidRepository.save(covid);

            // Set the Covid object for each Vaccine, then save them
            if(covid.getVaccinations().size()>=4)
                return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);

            for (Vaccine vaccine : covid.getVaccinations()) {
                if(vaccine.getDate().isAfter(LocalDate.now()))
                    return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
                vaccine.setCovid(covid);
                vaccineRepository.save(vaccine);
            }

            return new ResponseEntity<>(newClient, HttpStatus.CREATED);
        } catch (Exception e) {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity updatedetails(@PathVariable Long id,@RequestBody Client client){
        Client c=clientRepository.findById(id).orElse(null);
        if(c!=null){
            c.setBirthDate(client.getBirthDate());
            c.setCellularNumber(client.getCellularNumber());
            c.setFirstName(client.getFirstName());
            c.setLastName(client.getLastName());
            c.setIdentity(client.getIdentity());
            c.setPhoneNUmber(client.getPhoneNUmber());
            c.setAddress(client.getAddress());
            c.setMemberCovid(client.getMemberCovid());
            clientRepository.save(c);
            System.out.println(c.getPhoneNUmber());
            System.out.println(client.getPhoneNUmber());

            return new ResponseEntity(c,HttpStatus.NO_CONTENT);
        }
        else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

//delete client from the database
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteClient(@PathVariable Long id){
        try{
         clientRepository.deleteById(id);
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }
        catch (Exception e)
        {
            System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





    @GetMapping("/nonVaccinatedCount")
    public ResponseEntity<Long> getNonVaccinatedMemberCount() {
        long count = clientRepository.countNonVaccinatedMembers();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}


