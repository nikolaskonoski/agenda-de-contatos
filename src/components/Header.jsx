import React from 'react';
import logo from '../assets/logo-rivool.png';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';


function Header() {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
            <Toolbar sx={{ justifyContent: 'center' }}>
                <Box
                    component="img"
                    src={logo}
                    alt="Logo da Aplicação"
                    sx={{
                        height: '40px', 
                    }}
                />
            </Toolbar>
        </AppBar>
    );
}

export default Header;