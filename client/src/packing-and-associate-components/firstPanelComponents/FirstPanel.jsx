import React, { useContext, useEffect, useState } from 'react';
import { PanelContext } from '../../context/PanelContext';
import { Box, Button, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, List, ListItem, ListItemText, TextField, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material';
import axios from 'axios';
import TableCatalogue from './TableCatalogue';
import DisplayData from '../DisplayData';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import CloseIcon from '@mui/icons-material/Close';
import NewItems from './NewItems';
import TopFirstPanel from './TopFirstPanel'
import BottomFirstPanel from './BottomFirstPanel';

const FirstPanel = ({ itemsMaster, handleItemClick }) => {

  const { setFirstPanelContent, firstPanelContent, setSecondPanelContent, setSelectedItemList } = useContext(PanelContext);
  const [openScanner, setOpenScanner] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [selectedItem, setSelectedItem] = useState(null);
  // const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [trigger, setTrigger] = useState(true);
  // const [filteredGroup, setFilteredGroup] = useState(group);

  // const fetchItems = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3000/items-master');
  //     // const groupedItems = groupItems(response.data);
  //     setItems(response.data);
  //   } catch (error) {
  //     console.error('Error fetching items:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchItems();
  // }, [trigger]);

  // const groupItems = (items) => {
  //   const groupedItems = {};
  //   items.forEach((item) => {
  //     if (!groupedItems[item.Name]) {
  //       groupedItems[item.Name] = item;
  //     }
  //   });
  //   return Object.values(groupedItems);
  // };

  const handleViewSecondPanel = () => {
    // Set the content of the first panel
    setFirstPanelContent(firstPanelContent);
  };

  const handleOpenScanner = () => {
    setOpenScanner(true);
  };

  const handleCloseScanner = () => {
    setOpenScanner(false);
  };

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
      setItems(response.data);

    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSearch = (query) => {
    // Filter the group array based on the search query
    const filteredItems = group.filter(item =>
      item.Name.toLowerCase().includes(query.toLowerCase()) ||
      item.SKUNumber.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredGroup(filteredItems);
  };

  // const fetchItems = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/getItems`);
  //     setItems(response.data);
  //   } catch (error) {
  //     console.error('Error fetching items:', error);
  //   }
  // };



  // const handleItemClick = async (item) => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/getItemDetails/${item.ItemCode}`);
  //     const itemDetails = response.data;

  //     // Fetch count of items with the same itemCode
  //     const countResponse = await axios.get(`http://localhost:3000/getItemCount/${item.ItemCode}`);
  //     const itemCount = countResponse.data.count;

  //     // Update the state or context with the item details and count
  //     setSelectedItemList({ ...itemDetails, count: itemCount });
  //   } catch (error) {
  //     console.error('Error fetching item details:', error);
  //   }
  // };


  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontWeight: "bold", overflow: "hidden" }}>
      <TopFirstPanel handleOpen={handleOpen} handleSearch={handleSearch} />
      <BottomFirstPanel itemsMaster={itemsMaster} handleItemClick={handleItemClick} />
      {/* <TopFirstPanel handleOpen={handleOpen} />
      <BottomFirstPanel group={group} handleItemClick={handleItemClick} /> */}

      {/* Dialog component for Add New */}
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
              Add New Item
            </Grid>
            <Grid item>
              <IconButton aria-label="close" onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent>
          {/* Your dialog content goes here */}
          {/* <TextField label="Item Code" fullWidth />
          <TextField label="Item Name" fullWidth />
          <TextField label="SKU Number" fullWidth />
          <TextField label="Item Number Starts From" fullWidth />
          <Button type='submit' variant='contained' color='error'>Add Item</Button> */}
          <NewItems onItemAdded={handleItemAdded} onCloseDialog={handleClose} />
        </DialogContent>
      </Dialog>

    </div>
  );
};
export default FirstPanel;





{/* <List>
        {items.map((item) => (
          <div key={item.ItemID}>
            <ListItem onClick={() => handleItemClick(item)} sx={{
              backgroundColor: selectedItem && selectedItem.ItemID === item.ItemID ? '#d32f2f' : 'transparent',
              '&:hover': {
                backgroundColor: '#d32f2f',
                '& .MuiTypography-root': { // Target Typography component for secondary text
                  color: 'white',
                },
              },
            }} key={item.ItemID}>
              <ListItemText primary={item.Name} secondary={
                <>
                  <Typography sx={{
                    display: 'inline'
                  }} component='span' variant='body2' color='#a8a7a7'>
                    {item.SKUNumber}
                  </Typography>
                  {/* {` - ${entry.event_timestamp}`} */}
// </>
// } /> */}
{/* <IconButton onClick={handleOpenScanner}>
                <DocumentScannerIcon sx={{ color: "#d32f2f" }} />
              </IconButton> */}
{/* <Dialog
                fullWidth
                maxWidth="sm"
                open={openScanner}
                onClose={handleCloseScanner}
                PaperProps={{
                  sx: {
                    position: "fixed",
                    top: 10,
                    left: 0,
                    right: 0,
                    m: "0 auto",
                  },
                }}
                sx={{
                  '& .MuiBackdrop-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black for dim effect
                  },
                }}
              >
                <DialogTitle>
                  <Grid container>
                    <Grid item>Scanner</Grid>
                    <Grid item xs="auto">
                      <IconButton aria-label="close" onClick={handleCloseScanner}>
                        <CloseIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </DialogTitle>
                <DialogContent> */}
{/* Your popup content goes here */ }
{/* <p>This is where you can place the scanner functionality or any other content you want to display in the popup.</p>
                </DialogContent>
              </Dialog> */}
{/* </ListItem>
            <Divider sx={{ marginBottom: "-10px" }} />
          </div>
        ))}
      </List> */}
