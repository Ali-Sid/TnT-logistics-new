import { BottomNavigation, BottomNavigationAction, Paper, colors } from '@mui/material';
import React, { useState } from 'react'
import RestoreIcon from '@mui/icons-material/Restore';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import WrapTextIcon from '@mui/icons-material/WrapText';
import BuildIcon from '@mui/icons-material/Build';
import StyleIcon from '@mui/icons-material/Style';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import { useNavigate } from 'react-router-dom';

function BottomNav() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();
    const handleNavigation = (path) => {
        navigate(path);
      };
  return (
    <div>
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                 setValue(newValue);
                }}
              >
                <BottomNavigationAction onClick={() => handleNavigation('/')} label="Dashboard" icon={<DashboardIcon />} />
                <BottomNavigationAction onClick={() => handleNavigation('/resources/items')} label="Production" icon={<InventoryIcon />} />
                <BottomNavigationAction onClick={() => handleNavigation('/resources/packing')} label="Packing" icon={<WrapTextIcon />} />
                <BottomNavigationAction onClick={() => handleNavigation('/associate')} label="Assembly" icon={<BuildIcon />} />
                <BottomNavigationAction onClick={() => handleNavigation('/tags')} label="Tags" icon={<StyleIcon />} />
              </BottomNavigation>
            </Paper>
    </div>
  )
}

export default BottomNav