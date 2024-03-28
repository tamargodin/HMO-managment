// import * as React from 'react';
// import { styled, alpha } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import InputBase from '@mui/material/InputBase';
// import Badge from '@mui/material/Badge';
// import MenuItem from '@mui/material/MenuItem';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';
// import AccountCircle from '@mui/icons-material/AccountCircle';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import MoreIcon from '@mui/icons-material/MoreVert';
// import { Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom';
// import Cards from './Cards';
// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: '100%',
//   [theme.breakpoints.up('sm')]: {
//     marginLeft: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     // vertical padding + font size from searchIcon
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '20ch',
//     },
//   },
// }));

// export default function PrimarySearchAppBar() {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

//   const isMenuOpen = Boolean(anchorEl);
//   const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setMobileMoreAnchorEl(null);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     handleMobileMenuClose();
//   };

//   const handleMobileMenuOpen = (event) => {
//     setMobileMoreAnchorEl(event.currentTarget);
//   };

//   const menuId = 'primary-search-account-menu';
//   const renderMenu = (
//     <Menu
//       anchorEl={anchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={menuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMenuOpen}
//       onClose={handleMenuClose}
//     >
//       <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//       <MenuItem onClick={handleMenuClose}>My account</MenuItem>
//     </Menu>
//   );

//   const mobileMenuId = 'primary-search-account-menu-mobile';
//   const renderMobileMenu = (
//     <Menu
//       anchorEl={mobileMoreAnchorEl}
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       id={mobileMenuId}
//       keepMounted
//       transformOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       open={isMobileMenuOpen}
//       onClose={handleMobileMenuClose}
//     >
//       <MenuItem>
//         {/* <IconButton size="large" aria-label="show 4 new mails" color="inherit">
//           <Badge badgeContent={4} color="error">
//             <MailIcon />
//           </Badge>
//         </IconButton>
//         <p>Messages</p>
//       </MenuItem>
//       <MenuItem>
//         <IconButton
//           size="large"
//           aria-label="show 17 new notifications"
//           color="inherit"
//         >
//           <Badge badgeContent={17} color="error">
//             <NotificationsIcon />
//           </Badge>
//         </IconButton>
//         <p>Notifications</p> */}
//       </MenuItem>
//       {/* <MenuItem onClick={handleProfileMenuOpen}>
//         <IconButton
//           size="large"
//           aria-label="account of current user"
//           aria-controls="primary-search-account-menu"
//           aria-haspopup="true"
//           color="inherit"
//         >
//           <AccountCircle />
//         </IconButton>
//         <p>Profile</p>
//       </MenuItem> */}
//     </Menu>
//   );

//   return (<>
//   <div style={{backgroundColor:"black"}}>
//     <Box sx={{ flexGrow: 1 ,position: 'fixed', top: 0, left:"0", width: '100%', textAlign: 'center', zIndex:9999 ,marginButtom:15}}>
//       <AppBar position="static">
//         <Toolbar>
       
       
//           <Typography
//             variant="h6"
//             noWrap
//             component="div"
//             sx={{ display: { xs: 'none', sm: 'block' } }}
//           >
//              <div style={{ position: 'fixed', top: 0, left:"0", width: '100%', textAlign: 'center', zIndex:9999 ,height:"15vh",marginBottom: "20px"}}>
//         <div style={{ display: 'flex', justifyContent: 'center' ,height:"30%",top:0}}>
    
//           <Link to="/addClient" style={{ textDecoration: 'none'}}>
//             <h2 style={{ textDecoration: 'none',color:"black",left:0,padding:4,
//  fontSize:12}}>|about</h2>
//           </Link>
         
//         </div>

//         <div style={{ display: 'flex', justifyContent: 'center' ,height:"30%",top:0}}>
    
//     <Link to="/CovidGraph" style={{ textDecoration: 'none'}}>
//       <h2 style={{ textDecoration: 'none',color:"black",left:0,padding:4,
// fontSize:12}}>|CovidGraph</h2>
//     </Link>
   
//   </div>
   

//     <Link to="/Table" style={{ textDecoration: 'none'}}>
//       <h2 style={{ textDecoration: 'none',color:"black",left:0,padding:4,
// fontSize:12}}>|table</h2>
//     </Link>
   
//       </div>
//           </Typography>
        
//           <Box sx={{ flexGrow: 1 }} />
//           <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
         
        
         
//           </Box>
         
//         </Toolbar>
//       </AppBar>
//     </Box>  </div>
//      <Outlet style={{ position: 'absolute', top: '100px', width: '100%', zIndex: 1 }} />
    
//     <Routes >
//         <Route path="/" element={<Cards />} />
      
//       </Routes>
     
//     </>

//   );
// }




import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom';
import Table from './table'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* Mobile menu items */}
    </Menu>
  );

  return (
    <>
      <div style={{ backgroundColor: "black" }}>
        <Box sx={{ flexGrow: 1, position: 'fixed', top: 0, left: "0", width: '100%', textAlign: 'center', zIndex: 9999, marginButtom: 15 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                <div style={{ position: 'fixed', top: 0, left: "0", width: '100%', textAlign: 'center', zIndex: 9999, height: "15vh", marginBottom: "20px" }}>
                  <div style={{ display: 'flex', justifyContent: 'center', height: "30%", top: 0 }}>
                    <Link to="/addClient" style={{ textDecoration: 'none', marginRight: '10px' }}>
                      <h2 style={{ textDecoration: 'none', color: "black", left: 0, padding: 4, fontSize: 12 }}>| about</h2>
                    </Link>
                    <Link to="/CovidGraph" style={{ textDecoration: 'none', marginRight: '10px' }}>
                      <h2 style={{ textDecoration: 'none', color: "black", left: 0, padding: 4, fontSize: 12 }}>| CovidGraph</h2>
                    </Link>
                    <Link to="/Table" style={{ textDecoration: 'none' }}>
                      <h2 style={{ textDecoration: 'none', color: "black", left: 0, padding: 4, fontSize: 12 }}>| table</h2>
                    </Link>
                  </div>
                </div>
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <Outlet style={{ position: 'absolute', top: '100px', width: '100%', zIndex: 1 }} />
      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>
    </>
  );
}
