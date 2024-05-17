import React from 'react';
import { Tooltip, IconButton, Typography, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Import desired icons
import InventoryIcon from '@mui/icons-material/Inventory'; // Adjust as needed
import WrapTextIcon from '@mui/icons-material/WrapText';
import BuildIcon from '@mui/icons-material/Build'; // Adjust as needed
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
    };
    return (
        <div className="sidebar-container">
            <div className='sidebar-logo'>
                <Typography variant='p'>Logo</Typography>
            </div>
            <div className='sidebar-icons'>
                <Tooltip title="Dashboard">
                    <IconButton sx={{display: "flex", flexDirection: "column"}} onClick={() => handleNavigation('/')}>
                        <DashboardIcon sx={{ color: 'white' }} />
                        <Typography variant='p' sx={{fontSize: "10px", color: "#fff"}}>Dashboard</Typography>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Production">
                    <IconButton sx={{display: "flex", flexDirection: "column"}} onClick={() => handleNavigation('/resources/machines')}>
                        <InventoryIcon sx={{ color: 'white' }} />
                        <Typography variant='p' sx={{fontSize: "10px", color: "#fff"}}>Production</Typography>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Items">
                    <IconButton sx={{display: "flex", flexDirection: "column"}} onClick={() => handleNavigation('/resources/items')}>
                        <InventoryIcon sx={{ color: 'white' }} />
                        <Typography variant='p' sx={{fontSize: "10px", color: "#fff"}}>Items</Typography>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Packing">
                    <IconButton sx={{display: "flex", flexDirection: "column"}} onClick={() => handleNavigation('/resources/packing')}>
                        <WrapTextIcon sx={{ color: 'white' }} />
                        <Typography variant='p' sx={{fontSize: "10px", color: "#fff"}}>Packing</Typography>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Assembly">
                    <IconButton sx={{display: "flex", flexDirection: "column"}} onClick={() => handleNavigation('/associate')}>
                        <BuildIcon sx={{ color: 'white' }} />
                        <Typography variant='p' sx={{fontSize: "10px", color: "#fff"}}>Assembly</Typography>
                    </IconButton>
                </Tooltip>
                <Divider sx={{ backgroundColor: 'white', borderRadius: "15px" }} />
            </div>
            <div className='sidebar-bottom-icons'>
                <Tooltip title="Settings">
                    <IconButton onClick={() => handleNavigation('/resources/items')}>
                        <SettingsIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Account">
                    <IconButton onClick={() => handleNavigation('/')}>
                        <AccountCircleIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Logout">
                    <IconButton onClick={() => handleNavigation('/resources/items')}>
                        <LogoutIcon sx={{ color: 'white' }} />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
}

export default Sidebar;
