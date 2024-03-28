import axios from 'axios'
import {setMember,deleteMember,updateMember,addMember} from '../reducers/memberSlice';


export const addMemberMiddleware = ({ dispatch, getState }) => next => action => {
    if (action.type === 'ADD_MEMBER') {
     // console.log("id",action.payload.user);
      const newMember = action.payload;
      const { state, img } = action.payload; 


  const formData = new FormData();
  

// append the file to the FormData object
console.log('333333333333333333333',img)
formData.append("image", img);
console.log(state);
formData.append("client", new Blob([JSON.stringify(state)], {
  type: "application/json"}));

console.log(img);
// make a POST request to the File Upload API with the FormData object and Rapid API headers
axios.post("http://localhost:8585/api/clients/uploadMember", formData
  )
  .then((response) => {
   
    console.log(response.data);
    dispatch(addMember(response.data));
  })
  .catch((error) => {
  
    console.log(error);
  });

  
}  return next(action);
 };


 export const getMembers = ({ dispatch, getState }) => (next) => (action) => {
    //  const navigate=useNavigate();
      if (action.type === 'GET_MEMBER') {  
       axios.get("http://localhost:8585/api/clients/getDTO")
       .then((response) => {
        console.log('response.data', response.data);
         dispatch(setMember(response.data));
        // navigate('/menu/home')
        //  alert("welcome back")
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    
      return next(action);
    };



    export const deleteMemberMiddleWare = ({ dispatch, getState }) => (next) => (action) => {
      //  const navigate=useNavigate();
        if (action.type === 'DELETE_MEMBER') {  
         axios.delete(`http://localhost:8585/api/clients/delete/${action.id}`)
         .then((response) => {
          console.log('response.data', response.data);
           dispatch(deleteMember(action));
          // navigate('/menu/home')
          //  alert("welcome back")
            })
            .catch((error) => {
              console.error("error", error);
            });
        }
      
        return next(action);
      };


  
      export const editUserMiddleware = ({ dispatch, getState }) => (next) => (action) => {
        //  const navigate=useNavigate();
          if (action.type === 'EDIT_MEMBER') {  

            console.log("idddddddddddd",action.id,action.payload);
            const memberId=action.id
           axios.put(`http://localhost:8585/api/clients/update/${action.id}`,action.payload)
           .then((response) => {
            console.log('response.data', response.data);
            console.log(response.data);
             dispatch(updateMember({ id: memberId, updatedMember: action.payload }));
            // navigate('/menu/home')
            //  alert("welcome back")
              })
              .catch((error) => {
                console.error("error", error);
              });
          }
        
          return next(action);
        };









        // @PutMapping("/update/{id}")
        // public ResponseEntity updatedetails(@PathVariable Long id, @RequestPart("image") MultipartFile file,
        //                                     @RequestPart("client") Client client) {
        //     try {
        //         Client c = clientRepository.findById(id).orElse(null);
        //         if (c != null) {
        //             // Update client details
        //             c.setBirthDate(client.getBirthDate());
        //             c.setCellularNumber(client.getCellularNumber());
        //             c.setFirstName(client.getFirstName());
        //             c.setLastName(client.getLastName());
        //             c.setIdentity(client.getIdentity());
        //             c.setPhoneNUmber(client.getPhoneNUmber());
        //             c.setAddress(client.getAddress());
    
        //             // Save the image
        //             if (file != null) {
        //                 String filePath = PATH_IMG + file.getOriginalFilename();
        //                 Path filename = Paths.get(filePath);
        //                 Files.write(filename, file.getBytes());
        //                 c.setImg(filePath);
        //             }
    
        //             // Update Covid details
        //             Covid covid = client.getMemberCovid();
        //             if (covid != null) {
        //                 // Set the existing client for the Covid entity
        //                 covid.setClient(c);
        //                 covidRepository.save(covid);
    
        //                 // Update the Covid object for each Vaccine
        //                 for (Vaccine vaccine : covid.getVaccinations()) {
        //                     vaccine.setCovid(covid);
        //                     vaccineRepository.save(vaccine);
        //                 }
        //             }
    
        //             // Save the updated client
        //             clientRepository.save(c);
        //             return new ResponseEntity(HttpStatus.NO_CONTENT);
        //         } else {
        //             return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        //         }
        //     } catch (Exception e) {
        //         System.out.println(e);
        //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        //     }
        // }