import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
// import { PanelContext } from '../context/PanelContext';

const TestPassingData = ({ selectedItem, items, onItemSelected, handleItemClick2, onItemClick }) => {
  const [data, setData] = useState([]);

  // Filter items based on selected item
  const filteredItems = selectedItem ? items.filter((item) => item.Name === selectedItem.Name) : [];

  const handleItemClick = (item) => {
    // Call the onItemSelected prop with the clicked item
    onItemClick(item);
   };

  return (
    <div>
      <Typography align='left' pl={2} variant="h5" color='#5c5c5c' noWrap>
        Items Catalogue
      </Typography>
      <List>
                {/* {selectedItem && items
                    .filter((item) => item.Name === selectedItem.Name) // Filter items based on selected item
                    .map((item) => ( */}
                    {filteredItems.map((item) => (
                        <div key={item.ItemID}>
                            <ListItemButton
                            onClick={() => handleItemClick(item)} sx={{
                                '&:hover': {
                                    backgroundColor: '#d32f2f',
                                    '& .MuiTypography-root': { // Target Typography component for secondary text
                                        color: 'white',
                                    },
                                },
                            }}>
                                <ListItemText primary={item.Name} secondary={
                                    <>
                                        <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='#a8a7a7'>
                                            {item.SKUNumber}
                                        </Typography>
                                    </>
                                } />
                            </ListItemButton>
                            <Divider sx={{ marginBottom: "-10px" }} />
                        </div>
                    ))
                }
            </List>
    </div>
  );
};

export default TestPassingData;


{/* <List>
        {items
          .filter((item) => selectedItem && selectedItem.ItemCode === item.ItemCode) // Filter items based on selected item
          .map((item) => (
            <div key={item.ItemID}>
              <ListItem sx={{
                backgroundColor: selectedItem && selectedItem.ItemCode === item.ItemCode ? '#d32f2f' : 'transparent',
                '&:hover': {
                  backgroundColor: '#d32f2f',
                  '& .MuiTypography-root': { // Target Typography component for secondary text
                    color: 'white',
                  },
                },
              }}>
                <ListItemText primary={item.Name} secondary={
                  <>
                    <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='#a8a7a7'>
                      {item.SKUNumber}
                    </Typography>
                  </>
                } />
              </ListItem>
              <Divider sx={{ marginBottom: "-10px" }} />
            </div>
          ))}
      </List> */}
