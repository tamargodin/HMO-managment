import axios from 'axios'

import {updateCovid} from '../reducers/memberSlice'
 
export const editCovidMiddleware = ({ dispatch, getState }) => (next) => (action) => {
    //  const navigate=useNavigate();
      if (action.type === 'EDIT_COVID') {  

        console.log("idddddddddddd",action.id,action.payload);
        const memberId=action.id2
       axios.put(`http://localhost:8585/api/covid/update/${action.id}`,action.payload)
       .then((response) => {
        // console.log('response.data', response.data);
     dispatch(updateCovid({ id: memberId, updatedMember: action.payload }));
        // navigate('/menu/home')
        //  alert("welcome back")
          })
          .catch((error) => {
            console.error("error", error);
          });
      }
    
      return next(action);
    };