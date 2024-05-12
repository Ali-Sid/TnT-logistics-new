import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import TopSecondPanel from './TopSecondPanel';
import BottomSecondPanel from './BottomSecondPanel';
import NewItemCatalog from './NewItemCatalog';
import CloseIcon from '@mui/icons-material/Close';
// import { PanelContext } from '../context/PanelContext';

const SecondPanel = ({ selectedItem, machines, items, onItemSelected, handleItemClick, onItemClick }) => {
  const [open, setOpen] = useState(false)
  const [getItems, setGetItems] = useState([])
  const [tags, setTags] = useState('')

  // useEffect(() => {
  //   // Fetch items when the component mounts or when the selected item changes
  //   fetchItems();
  // }, [selectedItem]);

  // const fetchItems = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/getItems');
  //     setGetItems(Array.isArray(response.data) ? response.data : []);
  //   } catch (error) {
  //     console.error('Error fetching items:', error);
  //   }
  // };

  // Filter items based on selected item
  const filteredItems = selectedItem ? getItems.filter((item) => item.Name === selectedItem.ItemDesc) : [];
  const totalCount = filteredItems.length;

  // const filteredItems = selectedItem ? packingItems.filter(item => item.PItemMasterID === selectedItem.PItemMasterID) : [];
  // const totalCount = filteredItems.length;

  // Wait for both packing items and tags to be fetched
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemResponse, tagsResponse] = await Promise.all([
          axios.get('http://localhost:3000/getItems'),
          axios.get('http://localhost:3000/tags')
        ]);

        setGetItems(itemResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchData();
  }, [selectedItem]);

  


  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleItemAdded = async (newItems) => {
    // Refetch items after an item is added
    try {
      const response = await axios.get('http://localhost:3000/getItems');
      setGetItems(response.data);

    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  return (
    <div>
      <div style={{overflow: "hidden"}}>
        {selectedItem && <TopSecondPanel selectedItem={selectedItem} handleOpen={handleOpen} handleClose={handleClose} totalCount={totalCount} />}
        <BottomSecondPanel items={filteredItems} tags={tags} onItemClick={onItemClick} />
        <Dialog
        fullWidth
        fullScreen
        maxWidth="sm"
        open={open} // Use the open state here
        onClose={handleClose} // Use the handleClose function here
      >
        <DialogTitle>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              Add New Catalogue
            </Grid>
            <Grid item>
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          <NewItemCatalog selectedItem={selectedItem} onItemAdded={handleItemAdded} onCloseDialog={handleClose} />
        </DialogContent>
      </Dialog>
      </div>
    </div>

  );
};

export default SecondPanel;


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
