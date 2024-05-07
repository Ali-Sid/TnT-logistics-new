import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { Box, Divider, IconButton, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import axios from 'axios';

function TestThird({ selectedItem }) {
  const [group, setGroup] = useState('');
  const [items, setItems] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [itemDetails, setItemDetails] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const handleGetDetails = async () => {
    try {
      // Make a GET request to fetch item details based on the input barcode
      const response = await axios.get(`http://localhost:3000/tags`);
      // Update the state with the fetched item details
      const filtered = response.data.filter(item => item.ItemNumber === inputValue);
      setFilteredItems(filtered);
      console.log(filteredItems)
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  // Function to fetch items
  // const fetchItems = async () => {

  //   // try {
  //   //   const response = await axios.get('http://localhost:3000/getItems');
  //   //   const groupedItems = groupItems(response.data);
  //   //   setGroup(groupedItems);
  //   //   setItems(response.data);
  //   // } catch (error) {
  //   //   console.error('Error fetching items:', error);
  //   // }
  //   // useEffect(() => {
  //   //   fetchItems(); // Fetch items on component mount
  //   // }, []);
  // };

  return (
    <div style={{ display: "flex", flexDirection: "row", width: "100vw" }}>
      <div style={{ width: "30%" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ marginLeft: "10px", padding: "5px 3px 5px 3px", border: "1px solid #d32f2f", backgroundColor: "#d32f2f", color: "#fff", borderRadius: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "auto", height: "16px" }}>
            <BookmarksIcon />
          </Box>
          <Typography align='left' pl={1} variant="h5" color='#5c5c5c' noWrap>
            Select Parent Resource
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", mt: 0, ml: 2, mr: 2 }}>
          <Button variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "12px", height: "28px" }}>Scan Parent Tag</Button>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scan Barcode"
            type="text"
            fullWidth
            // value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}

          />
          <Button onClick={handleGetDetails} variant='outlined' color='error' sx={{ textTransform: 'none', fontSize: "12px", height: "28px" }}>Get Details</Button>
          <Box>
            {filteredItems.length > 0 && (
              <div>
                <Typography variant="h6">Filtered Items:</Typography>
                {filteredItems.map((item) => (
                  <div key={item.ItemID}>
                    <Typography>{`Item Code: ${item.ItemCode}`}</Typography>
                    <Typography>{`Name: ${item.Name}`}</Typography>
                    <Typography>{`SKU Number: ${item.SKUNumber}`}</Typography>
                  </div>
                ))}
              </div>
            )}
          </Box>
          {/* <Button startIcon={<AddBoxIcon />} onClick={handleOpen} variant='text' color='error' sx={{ textTransform: 'none', fontSize: "16px" }}>Add</Button> */}
        </Box>
      </div>
      <div style={{ width: "70%" }}>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ marginLeft: "10px", padding: "5px 3px 5px 3px", border: "1px solid #d32f2f", backgroundColor: "#d32f2f", color: "#fff", borderRadius: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "auto", height: "16px" }}>
            <BookmarksIcon />
          </Box>
          <Typography align='left' pl={1} variant="h5" color='#5c5c5c' noWrap>
            Select Child Resource
          </Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", mt: 0, ml: 2, mr: 2 }}>
          <Button variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "12px", height: "28px" }}>Scan Child Tag</Button>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Scan Barcode"
            type="text"
            fullWidth
            // value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          {/* <Button onClick={handleGetDetails} variant='outlined' color='error' sx={{ textTransform: 'none', fontSize: "12px", height: "28px" }}>Get Details</Button> */}

          {/* <Button onClick={handleOpen} variant="contained" color="error">Add New</Button> */}
          {/* <Button startIcon={<AddBoxIcon />} onClick={handleOpen} variant='text' color='error' sx={{ textTransform: 'none', fontSize: "16px" }}>Add</Button> */}
        </Box>
      </div>
    </div>
  )
}

export default TestThird