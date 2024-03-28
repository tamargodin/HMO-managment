package com.javatpoint.service;

import com.javatpoint.dto.ClientDTO;
import com.javatpoint.model.Client;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-03-28T15:36:04+0200",
    comments = "version: 1.4.2.Final, compiler: javac, environment: Java 1.8.0_111 (Oracle Corporation)"
)
@Component
public class MapStructMapperImpl implements MapStructMapper {

    @Override
    public List<ClientDTO> clientsToDTO(List<Client> members) throws IOException {
        if ( members == null ) {
            return null;
        }

        List<ClientDTO> list = new ArrayList<ClientDTO>( members.size() );
        for ( Client client : members ) {
            list.add( clientToDTO( client ) );
        }

        return list;
    }
}
