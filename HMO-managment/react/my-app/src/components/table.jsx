

import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Avatar from '@mui/material/Avatar';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditClient from './editClient.jsx'
import EditCovid from './EditCovid.jsx'
function Row(props) {
const dispatch=useDispatch()
  useEffect(() => {
dispatch({ type: 'GET_MEMBER' });
// setCurrentRequest(myRequest)
// console.log(myRequest);
}, []);

  const deleteClient = ()=>{
    dispatch({type:"DELETE_MEMBER", id:row?.id});
    if(open)
       setOpen(!open)

}
  const { row } = props;
  const [open, setOpen] = useState(false);
  function convertToDateFormat(isoDate) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
}
  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          <EditClient client={row} sx={{border:'none',border:0}}> <a href="#" ></a></EditClient> 
        <button onClick={deleteClient}> <DeleteIcon/></button> 
        </TableCell>
        <TableCell component="th" scope="row">
        <Avatar
            className="rounded-circle shadow-1-strong me-3"
            alt="avatar"
          //  src={`data:image/png;base64, ${person?.userId?.img}`||"https://lh3.googleusercontent.com/-JM2xsdjz2Bw/AAAAAAAAAAI/AAAAAAAAAAA/DVECr-jVlk4/photo.jpg"} 

           src={`data:image/png;base64,${row?.img}`}
         
           sx={{width:60,height:60}}
            // src={myUser.img}
            width={135} // Adjust the width to make the image larger
            height={135} // Adjust the height accordingly
          />
        </TableCell>
        <TableCell component="th" scope="row">
          {row.firstName}
        </TableCell>
        <TableCell >{row.lastName}</TableCell>
        <TableCell>{row.identity}</TableCell>
   
        
        <TableCell>{convertToDateFormat(row.birthDate)}</TableCell>
        <TableCell>{row.phoneNUmber}</TableCell>
        <TableCell>{row.cellularNumber}</TableCell>
    
        <TableCell>{row.address?.city}, {row.address?.street},{row.address?.houseNumber}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
          
              <Typography variant="h6" gutterBottom component="div">  <EditCovid covid={row.memberCovid} id={row.id} sx={{border:'none',border:0}}> <a href="#" ></a></EditCovid> 
             Covid
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>datpositiveResultDatee</TableCell>
                    <TableCell>recovertDate</TableCell>

                  </TableRow>
                </TableHead>
                <TableBody>
           
                <TableRow>
                      <TableCell component="th" scope="row">
                        {row.memberCovid?.positiveResultDate}
                      </TableCell> 
                   
                      <TableCell>{row.memberCovid?.recoveryDate}</TableCell>
                      {/* <TableCell align="right">{historyRow.amount}</TableCell> */}
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                      </TableCell>
                    </TableRow>
       <Typography variant="h6" gutterBottom component="div">
             Vaccinations
              </Typography>


                  {row.memberCovid?.vaccinations.map((vaccinations,index) => (
                    <TableRow key={vaccinations.customerId + index}>
                      <TableCell component="th" scope="row">
                        {vaccinations.date}
                      </TableCell>
                      <TableCell>{vaccinations.manufacturerName}</TableCell>
                      <TableCell align="right">
               
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
            
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    firstName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default function MemberTable() {

  const myMembers = useSelector((state) => state.members.memberList);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell></TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>last Name</TableCell>                
            <TableCell >id</TableCell>
            <TableCell >birth date</TableCell>
            <TableCell >phoneNumber</TableCell>
            <TableCell >cellolar </TableCell>
            <TableCell >address</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {myMembers.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


