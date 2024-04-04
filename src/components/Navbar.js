import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar sx={{ display: "flex" }}>
          <IconButton>
            <Typography variant='h2' sx={{ flexGrow: 1 }}>LOGO</Typography>
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{
            display: 'flex',
            justifyContent: "space-evenly"
          }}>
            <Typography variant='h6' sx={{ cursor: 'pointer' }}>
              <Link className='link' to="/">HOME</Link>
            </Typography>
            <Typography variant='h6' marginLeft={20} sx={{ cursor: 'pointer' }}>
              <Link 
                className='link'
               to="/cart">CART</Link>
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
