import React from 'react';
import { Tooltip, Typography, Divider, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import WrapTextIcon from '@mui/icons-material/WrapText';
import BuildIcon from '@mui/icons-material/Build';
import StyleIcon from '@mui/icons-material/Style';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const isActive = (targetPath) => {
        return location.pathname === targetPath;
    };

    const buttonStyles = (path) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: isActive(path) ? '#d4d4d4' : 'white',
        padding: '10px 0',
        cursor: 'pointer',
        '&:hover': {
            // backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        border: 'none',
        outline: 'none',
        // marginBottom: '10px'
    });

    return (
        <Box className="sidebar-container">
            <Box className='sidebar-logo' sx={{ textAlign: 'center' }}>
                <img src='/src/assets/tntl.png' />
            </Box>
            <Box className='sidebar-icons' sx={{ padding: '8px 0' }}>
                <Tooltip title="Dashboard">
                    <Box component="div" sx={buttonStyles('/')} onClick={() => handleNavigation('/')}>
                        <DashboardIcon sx={{ color: isActive('/') ? '#d4d4d4' : 'white' }} />
                        <Typography variant='p' sx={{ fontSize: '10px', color: '#fff' }}>Dashboard</Typography>
                    </Box>
                </Tooltip>
                <Tooltip title="Production">
                    <Box component="div" sx={buttonStyles('/resources/machines')} onClick={() => handleNavigation('/resources/machines')}>
                        <InventoryIcon sx={{ color: isActive('/resources/machines') ? '#d4d4d4' : 'white' }} />
                        <Typography variant='p' sx={{ fontSize: '10px', color: '#fff' }}>Production</Typography>
                    </Box>
                </Tooltip>
                <Tooltip title="Items">
                    <Box component="div" sx={buttonStyles('/resources/items')} onClick={() => handleNavigation('/resources/items')}>
                        <InventoryIcon sx={{ color: isActive('/resources/items') ? '#d4d4d4' : 'white' }} />
                        <Typography variant='p' sx={{ fontSize: '10px', color: '#fff' }}>Items</Typography>
                    </Box>
                </Tooltip>
                <Tooltip title="Packing">
                    <Box component="div" sx={buttonStyles('/resources/packing')} onClick={() => handleNavigation('/resources/packing')}>
                        <WrapTextIcon sx={{ color: isActive('/resources/packing') ? '#d4d4d4' : 'white' }} />
                        <Typography variant='p' sx={{ fontSize: '10px', color: '#fff' }}>Packing</Typography>
                    </Box>
                </Tooltip>
                <Tooltip title="Assembly">
                    <Box component="div" sx={buttonStyles('/associate')} onClick={() => handleNavigation('/associate')}>
                        <BuildIcon sx={{ color: isActive('/associate') ? '#d4d4d4' : 'white' }} />
                        <Typography variant='p' sx={{ fontSize: '10px', color: '#fff' }}>Assembly</Typography>
                    </Box>
                </Tooltip>
                <Tooltip title="Tags">
                    <Box component="div" sx={buttonStyles('/associate')} onClick={() => handleNavigation('/tags')}>
                        <StyleIcon sx={{ color: isActive('/associate') ? '#d4d4d4' : 'white' }} />
                        <Typography variant='p' sx={{ fontSize: '10px', color: '#fff' }}>Tags</Typography>
                    </Box>
                </Tooltip>
                {/* <Divider sx={{ backgroundColor: 'white', borderRadius: '15px' }} /> */}
            </Box>
        </Box>
    );
}

export default Sidebar;
