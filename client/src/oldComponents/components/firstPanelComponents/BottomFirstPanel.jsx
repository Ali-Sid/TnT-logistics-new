import { Divider, List, ListItem, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

function BottomFirstPanel({ group, itemsMaster, handleItemClick, searchQuery, filteredGroup }) {

    const [searchFilteredGroup, setSearchFilteredGroup] = useState([]);
    
    // Update the filtered group whenever the search query or group changes
    useEffect(() => {
        filterGroup();
    }, [searchQuery, group]);

    const filterGroup = () => {
        if (!searchQuery) {
            // If search query is empty, display all items
            setSearchFilteredGroup(group); // Changed here
        } else {
            // Filter the group array based on the search query
            const filteredItems = group.filter(item => // Changed here
                item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.SKUNumber.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchFilteredGroup(filteredItems);
        }
    };

    return (
        <div style={{ maxHeight: "calc(100vh - 150px)", flex: "1 1 auto", overflow: "auto" }}>
            <List>
                {itemsMaster.map((item) => (
                    <div key={item.ID}>
                        <ListItem onClick={() => handleItemClick(item)} sx={{
                            '&:hover': {
                                backgroundColor: '#d32f2f',
                                '& .MuiTypography-root': { // Target Typography component for secondary text
                                    color: 'white',
                                },
                            },
                        }} key={item.MachineID}>
                            <ListItemText primary={item.Name} secondary={
                                <>
                                    <Typography sx={{
                                        display: 'inline'
                                    }} component='span' variant='body2' color='#a8a7a7'>
                                        {item.SKUNumber}
                                    </Typography>
                                </>
                            } />
                        </ListItem>
                        <Divider sx={{ marginBottom: "-10px" }} />
                    </div>
                ))}
            </List>
        </div>
    )
}

export default BottomFirstPanel;
