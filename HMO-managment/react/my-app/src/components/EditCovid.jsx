import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';

export default function EditClient(props) {
  const covid = props.covid;
  const [open, setOpen] = React.useState(false);
  const [covidDetails, setCovidDetails] = useState({
    positiveResultDate: covid ? covid?.positiveResultDate || '' : '',
    recoveryDate: covid ? covid.recoveryDate || '' : '',
    vaccinations: covid && covid.vaccinations
      ? covid.vaccinations.map(vaccine => ({ ...vaccine })) : []
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleCovidChange = (event) => {
    const { name, value } = event.target;
    setCovidDetails({
      ...covidDetails,
      [name]: value
    });
  };

  // const handleVaccineChange = (index, field, value) => {
  //   const updatedVaccinations = [...covidDetails.vaccinations];
  //   updatedVaccinations[index][field] = value;
  //   setCovidDetails({
  //     ...covidDetails,
  //     vaccinations: updatedVaccinations
  //   });
  // };

  const handleVaccineChange = (index, field, value) => {
    const updatedVaccinations = [...covidDetails.vaccinations];
    updatedVaccinations[index] = {
      ...updatedVaccinations[index],
      [field]: value
    };
    setCovidDetails({
      ...covidDetails,
      vaccinations: updatedVaccinations
    });
  };
  

  // const handleAddVaccine = () => {
  //   if ((covidDetails.vaccinations.length==0)||(covidDetails.vaccinations.length < 4 &&
  //       covidDetails.vaccinations[covidDetails.vaccinations.length - 1].name !== '' &&
  //       covidDetails.vaccinations[covidDetails.vaccinations.length - 1].date !== '') ){
  //     setCovidDetails({
  //       ...covidDetails,
  //       vaccinations: [...covidDetails.vaccinations, { name: '', date: '' }]
  //     });
  //   }
  // };
  const handleAddVaccine = () => {
    const lastVaccine = covidDetails.vaccinations[covidDetails.vaccinations.length - 1];
    if (covidDetails.vaccinations.length < 4 && (!lastVaccine || (lastVaccine.manufacturerName && lastVaccine.date))) {
        setCovidDetails({
            ...covidDetails,
            vaccinations: [...covidDetails.vaccinations, { manufacturerName: '', date: '' }]
        });
    }
};

  const handleSubmit = (event) => {

    event.preventDefault();
  
    const positiveDate=new Date(covidDetails.positiveResultDate)
    const currentDate = new Date();
    const recoveryDate = new Date(covidDetails.recoveryDate);
     if(positiveDate > currentDate||recoveryDate> currentDate){
        alert("The Date must be before today's date");
        return;
    }

    if (recoveryDate <= positiveDate) {
        alert('Recovery date must be later than the positive date');
        return;
    }
     if ((covidDetails.recoveryDate !=null&& !isNaN(covidDetails.recoveryDate) && covidDetails.positiveResultDate ==null)) {
        // Proceed with form submission or further processing
        alert("positive result date must writen ");
        return
      }
    dispatch({ type: 'EDIT_COVID', payload: covidDetails, id: covid?.id,id2:props?.id });
    handleClose();
  };

  return (
    <React.Fragment >
      <Button variant="outlined" onClick={handleClickOpen} style={{ border: 'none', border: '0' }}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} style={{ fullWidth: '50%' }}>
        <DialogTitle>Edit Client COVID Details</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField label="Positive Result Date" name="positiveResultDate" type="date"
              value={covidDetails.positiveResultDate} onChange={handleCovidChange} />
            {/* Fix the name attribute here */}
            <TextField label="Recovery Date" name="recoveryDate" type="date"
              value={covidDetails.recoveryDate} onChange={handleCovidChange} />
         
            <div>
              {covidDetails.vaccinations.map((vaccine, index) => (
                <div key={index}>
                  <TextField label={`Vaccine ${index + 1} manufacturerName`} value={vaccine.manufacturerName}
                    onChange={(e) => handleVaccineChange(index, 'manufacturerName', e.target.value)} />
                  <TextField label={`Vaccine ${index + 1} Date`} type="date" value={vaccine.date}
                    onChange={(e) => handleVaccineChange(index, 'date', e.target.value)} />
                </div>
              ))}
              {covidDetails.vaccinations.length < 4 &&
                <Button onClick={handleAddVaccine}>Add Vaccine</Button>
              }
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
