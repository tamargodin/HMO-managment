package com.javatpoint.service;


import com.javatpoint.dto.ClientDTO;
import com.javatpoint.model.Client;
import org.mapstruct.Mapper;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.List;

@Mapper(componentModel = "spring")
public interface MapStructMapper {

    List<ClientDTO> clientsToDTO(List<Client> members) throws IOException;
    default ClientDTO clientToDTO(Client m) throws IOException {
        if(m!=null){
            ClientDTO clientDTO = new ClientDTO();
            clientDTO.setBirthDate(m.getBirthDate());
            clientDTO.setCellularNumber(m.getCellularNumber());
            clientDTO.setFirstName(m.getFirstName());
            clientDTO.setLastName(m.getLastName());
            clientDTO.setId(m.getId());
            clientDTO.setIdentity(m.getIdentity());
            clientDTO.setPhoneNUmber(m.getPhoneNUmber());
            clientDTO.setAddress(m.getAddress());
            clientDTO.setMemberCovid(m.getMemberCovid());

            Path filename= Paths.get(m.getImg());

            byte [] byteImage=Files.readAllBytes(filename);
            clientDTO.setImg(Base64.getEncoder().encodeToString(byteImage));
            return clientDTO;
        }
        return null;

    }
}
