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
  const [selectedItemDetails, setSelectedItemDetails] = useState(null); // Store details for selected item
  const [error, setError] = useState(null);
  const [details, setDetails] = useState([]);
  const [packingDetails, setPackingDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [barcodeValue, setBarcodeValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [tagId, setTagId] = useState('');

  // const handleGetDetails = async () => {
  //   try {
  //     // Make a GET request to fetch item details based on the input barcode
  //     const response = await axios.get(`http://localhost:3000/tags`);
  //     // Update the state with the fetched item details
  //     const filtered = response.data.filter(item => item.ItemNumber === inputValue);
  //     setFilteredItems(filtered);
  //     console.log(filteredItems)
  //   } catch (error) {
  //     console.error('Error fetching item details:', error);
  //   }
  // };

  // const handleGetDetails = async () => {
  //   try {
  //     // const response = await axios.get(`/tags/${barcodeValue}`);
  //     const response = await axios.post('/get-details', { barcode: barcodeValue });
  //     setItemDetails(response.data);
  //     setError(null); // Clear any previous errors
  //   } catch (error) {
  //     console.error('Error fetching item details:', error);
  //     setError(error.response?.data?.message || 'Error fetching details'); // Handle potential errors
  //   }
  // };

  const handleGetDetails = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });
      const data = await response.json();
      // Handle the response data here
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    const fetchData = async (tagId) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`/api/send-input`, { tagId }); // Send tagId in request body
        const data = response.data;

        setDetails(data); // Update details state with received data

        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.response?.data?.error || 'Failed to fetch data.'); // Handle different error scenarios
      } finally {
        setIsLoading(false);
      }
    };

    // Call fetchData with the tagId from state or props (replace with your logic)
    if (tagId) {
      fetchData(tagId);
    }

  }, [tagId]);


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
          <form onSubmit={handleGetDetails}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Scan Barcode"
              type="text"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}

            />
            <Button type='submit' variant='outlined' color='error' sx={{ textTransform: 'none', fontSize: "12px", height: "28px" }}>Get Details</Button>
          </form>
          <Box>
            {/* {filteredItems.length > 0 && ( */}
              <div>
                <Typography variant="h6">Filtered Items:</Typography>
                {/* {filteredItems.map((item) => (
                  <div key={item.ItemID}>
                    <Typography>{`Item Code: ${item.ItemNumber}`}</Typography>
                    <Typography>{`Name: ${item.Name}`}</Typography>
                    <Typography>{`SKU Number: ${item.SKUNumber}`}</Typography>
                  </div>
                ))} */}
                {/* {itemDetails && (
                  <div>
                    <Typography variant="h6">Item Details:</Typography>
                    {/* Conditionally display details based on itemDetails structure */}
                {/* <Typography>ResType: {itemDetails.ResType}</Typography>
                    <Typography>Item Code: {itemDetails.ItemNumber && itemDetails.ItemNumber}</Typography>
                    <Typography>Name: {itemDetails.Name && itemDetails.Name}</Typography> */}
                {/* ... other relevant details */}
                {/* </div>
                )}  */}

                {searchResults && searchResults.map((item, index) => (
                  <div key={index}>
                    <h2>{item.PItemTagID || item.TagID}</h2>
                    <p>{item.Name || item.PItemName}</p>
                    <p>{item.Source}</p>
                    <p>{item.ID}</p>
                    <p>{item.PItemName || item.Name}</p>
                    {/* Render other details as needed */}
                  </div>
                ))}

                {/* Display error message conditionally */}
                {error && (
                  <Typography variant="body2" color="error">
                    {error}
                  </Typography>
                )}
              </div>
            {/* )} */}
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