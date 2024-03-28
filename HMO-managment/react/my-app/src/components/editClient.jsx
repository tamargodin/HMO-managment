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
  const client = props.client;
  const [open, setOpen] = React.useState(false);
  const [userUp, setUserUp] = useState({
    firstName: client ? client.firstName || '' : '',
    lastName: client ? client.lastName || '' : '',
    identity: client ? client.identity || '' : '',
    birthDate: client ? client.birthDate || '' : '',
    phoneNUmber: client ? client.phoneNUmber || '' : '',
    cellularNumber: client ? client.cellularNumber || null : null,  
    address: {
      city: client ? client.address.city || '' : '',  
      street: client ? client.address.street || '' : '',  
      houseNumber: client ? client.address.houseNumber || '' : '',  
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserUp(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddressChange = (event) => {
    const { name, value } = event.target;
    setUserUp(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
   
    const currentDate = new Date();
    const birthDate = new Date(userUp.birthDate);
    if(birthDate > currentDate){
        alert("The Birth Date must be before today's date");
        return;
    }

    if (!(userUp.identity.length === 9 && !isNaN(userUp.identity))) {
        alert("Identity is not valid! ");
        return;
    }

    if (!(userUp.cellularNumber.length === 10 || userUp.cellularNumber.length === 0)) {
        alert("Cellular number is not valid! ");
        return;
    }
   
    dispatch({ type: 'EDIT_MEMBER', payload: userUp, id: client.id });
    handleClose();
  };

  return (
    <React.Fragment >
      <Button variant="outlined" onClick={handleClickOpen} style={{ border: 'none', border: '0' }}>
        <EditIcon />
      </Button>
      <Dialog open={open} onClose={handleClose} style={{ width: '50%' }}>
        <DialogTitle>Edit Client</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField label="First Name" name="firstName" value={userUp.firstName} onChange={handleChange} />
            <TextField label="Last Name" name="lastName" value={userUp.lastName} onChange={handleChange} />
            <TextField label="Identity" name="identity" value={userUp.identity} onChange={handleChange} />
            <TextField label="Birth Date" name="birthDate" type="date" value={userUp.birthDate} onChange={handleChange} />
            <TextField   type="number" label="Phone Number" name="phoneNUmber" value={userUp.phoneNUmber} onChange={handleChange} />
            <TextField  type="number" pattern="[0-9]{10}" label="Cellular Number" name="cellularNumber" value={userUp.cellularNumber} onChange={handleChange} />                   
            <h3>Address</h3>
            <TextField label="City" name="city" value={userUp.address.city} onChange={handleAddressChange} required />
            <TextField label="Street" name="street" value={userUp.address.street} onChange={handleAddressChange} required />
            <TextField type="number" name="houseNumber" value={userUp.address.houseNumber} onChange={handleAddressChange} required />
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
