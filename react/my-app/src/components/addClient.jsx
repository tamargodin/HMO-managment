



import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';

export default function AddClient() {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        firstName: null,
        lastName: "",
        identity: "",
        address: {
            city: "",
            street: null,
            houseNumber:''
        },
        birthDate: null,
        phoneNUmber: "",
        cellularNumber: null,
        memberCovid: {
            positiveResultDate: null,
            recoveryDate: null,
            vaccinations: []
        },
    });

    const [img, setImg] = useState(null);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(state);
    };

    const handleAddressChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            address: {
                ...prevState.address,
                [name]: value
            }
        }));
    };

    const handleCovidChange = (event) => {
        const { name, value } = event.target;
        setState(prevState => ({
            ...prevState,
            memberCovid: {
                ...prevState.memberCovid,
                [name]: value === "" ? null : value
            }
        }));
   
    };

    const handleVaccineChange = (index, field, value) => {
        setState(prevState => {
            const updatedVaccinations = [...prevState.memberCovid.vaccinations];
            updatedVaccinations[index][field] = value === "" ? null : value;
            return {
                ...prevState,
                memberCovid: {
                    ...prevState.memberCovid,
                    vaccinations: updatedVaccinations
                }
            };
        });
    };

    const funcImg = (e) => {
        setImg(e.target.files[0]);
    };


    const addVaccination = () => {
        const vaccinations = state.memberCovid.vaccinations;
    
        // Check if there are any vaccinations
        if (vaccinations.length === 0) {
            setState(prevState => ({
                ...prevState,
                memberCovid: {
                    ...prevState.memberCovid,
                    vaccinations: [{ date: null, manufacturerName: "" }]
                }
            }));
            return;
        }
    
        const lastVaccination = vaccinations[vaccinations.length - 1];
        
        // Check if the last vaccination has both a name and a date
        if (!lastVaccination.manufacturerName || !lastVaccination.date) {
            alert("Please fill in the manufacturerName and date for the last vaccination before adding a new one.");
            return;
        }
    
        const currentDate = new Date();
        const lastVaccinationDate = new Date(lastVaccination.date);
    
        // Check if the last vaccination date is in the past
        if (lastVaccinationDate > currentDate) {
            alert("Please fill in the date for the last vaccination before adding a new one.");
            return;
        }
    
        setState(prevState => ({
            ...prevState,
            memberCovid: {
                ...prevState.memberCovid,
                vaccinations: [...vaccinations, { date: null, manufacturerName: "" }]
            }
        }));
    };
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
 
        const positiveDate=new Date(state.memberCovid.positiveResultDate)
        const currentDate = new Date();
        const recoveryDate = new Date(state.memberCovid.recoveryDate);
        const birthDate = new Date(state.birthDate);
         if(birthDate>currentDate||positiveDate > currentDate||recoveryDate> currentDate){
            alert("The Date positiv must be before today's date");
            return;
        }
  
        if (recoveryDate <= positiveDate && state.memberCovid.recoveryDate!=null) {
            
            alert('Recovery date must be later than the positive date');
            return;
        }
        if (!(state.identity.length === 9 && !isNaN(state.identity))) {
            // Proceed with form submission or further processing
            alert("Identity is not  valid! ");
            return
          }
        if (!(state.phoneNUmber?.length === 9 && !isNaN(state.phoneNUmber))) {
            // Proceed with form submission or further processing
            alert("phone number is not  valid! ");
            return
          }
          if (!(state.cellularNumber?.length === 10  || state.cellularNumber==null)) {
            // Proceed with form submission or further processing
            alert("cellolar is not  valid! ");
            return
          }
          if ((state.memberCovid.recoveryDate !=null&& !isNaN(state.memberCovid.recoveryDate) && state.memberCovid.positiveResultDate ==null)) {
            // Proceed with form submission or further processing
            alert("positive result date must writen ");
            return

          }

          const vaccinations = state.memberCovid.vaccinations;
          const lastVaccination = vaccinations[vaccinations.length - 1];
          if (!state.memberCovid.vaccinations.length==0 &&(!lastVaccination.manufacturerName || !lastVaccination.date)) {
            alert("Please fill in the manufacturerName and date for the last vaccination before adding a new one.");
            return;
        }
       
        const lastVaccinationDate = new Date(lastVaccination?.date);
    
        if (!state.memberCovid.vaccinations.length==0 &&(lastVaccinationDate > currentDate)) {
            alert("vaccination date is not valid");
            return;
        }
        dispatch({ type: 'ADD_MEMBER', payload: { state, img } });
    };


        const validateIdLength = (id) => {
        return id.length === 9;
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Input fields */}
                <TextField label="First Name" name="firstName" value={state.firstName} onChange={handleChange}  />
                <TextField label="Last Name" name="lastName" value={state.lastName} onChange={handleChange} required />
                <TextField  type ="number" label="Identity" name="identity" value={state.identity} onChange={handleChange} required />
<TextField
    label="Birth Date"
    name="birthDate" 
    type="date"
    value={state.birthDate}
    onChange={handleChange}
    required
/>
                 <TextField type= "number" label="phoneNUmber" name="phoneNUmber" value={state.phoneNUmber} onChange={handleChange} required />
                 <TextField type= "number" label="cellularNumber" name="cellularNumber" value={state.cellularNumber} onChange={handleChange}  />
                {/* Address fields */}
                <h3>address</h3>
                <TextField label="City" name="city" value={state.address.city} onChange={handleAddressChange} required />
                <TextField label="Street" name="street" value={state.address.street} onChange={handleAddressChange} required />
                <TextField type ="number" name="houseNumber" value={state.address.houseNumber} onChange={handleAddressChange} required />
                {/* COVID fields */}
                <h3>Covid</h3>
                <TextField
                    label="Positive Result Date"
                    name="positiveResultDate"
                    type="date"
                    value={state.memberCovid.positiveResultDate}
                    onChange={handleCovidChange}
                />
                <TextField
                    label="Recover Date"
                    name="recoveryDate"
                    type="date"
                    value={state.memberCovid.recoveryDate}
                    onChange={handleCovidChange}
                />
                {/* Vaccination fields */}
                {state.memberCovid.vaccinations.map((vaccine, index) => (
                    <div key={index}>
                        <TextField
                            label={`Vaccine ${index + 1} manufacturerName`}
                            value={vaccine.manufacturerName}
                            onChange={(e) => handleVaccineChange(index, 'manufacturerName', e.target.value)}
                        />
                        <TextField
                            label={`Vaccine ${index + 1} Date`}
                            type="date"
                            value={vaccine.date}
                            onChange={(e) => handleVaccineChange(index, 'date', e.target.value)}
                        />
                    </div>
                ))}
                {state.memberCovid.vaccinations.length < 4 && (
                    <Button type="button" onClick={addVaccination}>Add Vaccine</Button>
                )}
                <div>
                    <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} style={{ backgroundColor: 'red' }}>
                        Upload file <input type="file" onChange={funcImg} />
                    </Button>
                </div>
                <Button type="submit" style={{ backgroundColor: "red" }}>Add Client</Button>
            </form>
        </div>
    );
}















// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// import TextField from '@mui/material/TextField';
// import { useDispatch } from 'react-redux';

// export default function AddClient() {
//     const dispatch = useDispatch();

//     const [state, setState] = useState({
//         firstName: "",
//         lastName: "",
//         identity: "",
//         address: {
//             city: "",
//             street: null,
//         },
//         birthDate: null,
//         phoneNUmber: "",
//         cellularNumber: "",
//         memberCovid: {
//             positiveResultDate: null,
//             recovertDate: null,
//             vaccinations: []
//         },
//     });

//     const [img, setImg] = useState(null);

//     const validateDateOrder = (startDate, endDate) => {
//         return new Date(startDate) <= new Date(endDate);
//     };

//     const validateUniqueDate = (date, existingDates) => {
//         return !existingDates.includes(date);
//     };

//     const handleBirthDateChange = (event) => {
//         const { name, value } = event.target;
//         if (!validate(value)) {
//             alert('Birth Date cannot be in the future');
//             setState(prevState => ({
//                 ...prevState,
//                 [name]: ""
//             }));
//             return;
//         }
//         setState(prevState => ({
//             ...prevState,
//             [name]: value === "" ? null : value
//         }));
//     };

//     const validatePositiveResultDate = (positiveResultDate, recoverDate) => {
//         return !positiveResultDate || !recoverDate || new Date(positiveResultDate) <= new Date(recoverDate);
//     };

//     const validate = (date) => {
//         return !date || new Date(date) <= new Date();
//     };
    
//     const validateIdLength = (id) => {
//         return id.length === 9;
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         if (name === 'identity' && !validateIdLength(value)) {
//             alert('Identity must be 9 digits');
//             setState(prevState => ({
//                 ...prevState,
//                 [name]: ""
//             }));
//             return;
//         }
//         setState(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleAddressChange = (event) => {
//         const { name, value } = event.target;
//         setState(prevState => ({
//             ...prevState,
//             address: {
//                 ...prevState.address,
//                 [name]: value
//             }
//         }));
//     };

//     const handleCovidChange = (event) => {
//         const { name, value } = event.target;
//         if (!validate(value)){
//             alert('Positive Result Date cannot be in the future');
//             setState(prevState => ({
//                 ...prevState,
//                 memberCovid: {
//                     ...prevState.memberCovid,
//                     [name]: ""
//                 }
//             }));
//             return;
//         }
//         if (name === 'positiveResultDate' && !validatePositiveResultDate(value, state.memberCovid.recovertDate)) {
//             // Alert the user about invalid date order
//             alert('Positive Result Date must be before Recover Date');
//             setState(prevState => ({
//                 ...prevState,
//                 memberCovid: {
//                     ...prevState.memberCovid,
//                     [name]: ""
//                 }
//             }));
//             return;
//         }
//         setState(prevState => ({
//             ...prevState,
//             memberCovid: {
//                 ...prevState.memberCovid,
//                 [name]: value === "" ? null : value
//             }
//         }));
//     };

//     const handleVaccineChange = (index, field, value) => {
//         if (field === 'date') {
//             const existingDates = state.memberCovid.vaccinations.map(vaccine => vaccine.date);
//             if (!validateUniqueDate(value, existingDates)) {
//                 // Alert the user about duplicate dates
//                 alert('Each vaccination date must be unique');
//                 return;
//             }
//         }
//         setState(prevState => {
//             const updatedVaccinations = [...prevState.memberCovid.vaccinations];
//             updatedVaccinations[index][field] = value === "" ? null : value;
//             return {
//                 ...prevState,
//                 memberCovid: {
//                     ...prevState.memberCovid,
//                     vaccinations: updatedVaccinations
//                 }
//             };
//         });
//     };

//     const addVaccination = () => {
//         const lastVaccination = state.memberCovid.vaccinations[state.memberCovid.vaccinations.length - 1];
//         if ((!lastVaccination || (lastVaccination.name && lastVaccination.date)) && state.memberCovid.vaccinations.length < 4) {
//             setState(prevState => ({
//                 ...prevState,
//                 memberCovid: {
//                     ...prevState.memberCovid,
//                     vaccinations: [...prevState.memberCovid.vaccinations, { date: null, name: "" }]
//                 }
//             }));
//         }
//     };
    
//     const funcImg = (e) => {
//         setImg(e.target.files[0]);
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         dispatch({ type: 'ADD_MEMBER', payload: { state, img } });
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 {/* Input fields */}
//                 <TextField label="First Name" name="firstName" value={state.firstName} onChange={handleChange} required />
//                 <TextField label="Last Name" name="lastName" value={state.lastName} onChange={handleChange} required />
//                 <TextField label="Identity" name="identity" value={state.identity} onChange={handleChange} required />
//                 <TextField
//                     label="Birth Date"
//                     name="positiveResultDate"
//                     type="date"
//                     value={state.birthDate}
//                     onChange={handleBirthDateChange}
//                     required
//                 />
//                  <TextField type= "number" label="phoneNUmber" name="phoneNUmber" value={state.phoneNUmber} onChange={handleChange} required />
//                  <TextField type= "number" label="cellularNumber" name="cellularNumber" value={state.cellularNumber} onChange={handleChange}  />
//                 {/* Address fields */}
//                 <h3>address</h3>
//                 <TextField label="City" name="city" value={state.address.city} onChange={handleAddressChange} required />
//                 <TextField label="Street" name="street" value={state.address.street} onChange={handleAddressChange} required />
//                 {/* COVID fields */}
//                 <h3>Covid</h3>
//                 <TextField
//                     label="Positive Result Date"
//                     name="positiveResultDate"
//                     type="date"
//                     value={state.memberCovid.positiveResultDate}
//                     onChange={handleCovidChange}
//                 />
//                 <TextField
//                     label="Recover Date"
//                     name="recovertDate"
//                     type="date"
//                     value={state.memberCovid.recovertDate}
//                     onChange={handleCovidChange}
//                 />
//                 {/* Vaccination fields */}
//                 {state.memberCovid.vaccinations.map((vaccine, index) => (
//                     <div key={index}>
//                         <TextField
//                             label={`Vaccine ${index + 1} Name`}
//                             value={vaccine.name}
//                             onChange={(e) => handleVaccineChange(index, 'name', e.target.value)}
//                         />
//                         <TextField
//                             label={`Vaccine ${index + 1} Date`}
//                             type="date"
//                             value={vaccine.date}
//                             onChange={(e) => handleVaccineChange(index, 'date', e.target.value)}
//                         />
//                     </div>
//                 ))}
//                 {state.memberCovid.vaccinations.length < 4 && (
//                     <Button type="button" onClick={addVaccination}>Add Vaccine</Button>
//                 )}
//                 <div>
//                     <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} style={{ backgroundColor: 'red' }}>
//                         Upload file <input type="file" onChange={funcImg} />
//                     </Button>
//                 </div>
//                 <Button type="submit" style={{ backgroundColor: "red" }}>Add Client</Button>
//             </form>
//         </div>
//     );
// }


