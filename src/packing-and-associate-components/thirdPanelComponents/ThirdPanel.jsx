import React, { useContext, useEffect, useState } from 'react';
import { PanelContext } from '../../context/PanelContext';
import axios from 'axios';
import { Box, Button, DialogContent, Divider, Grid, List, ListItem, ListItemText, TextField, ThemeProvider, Typography, createTheme, useMediaQuery } from '@mui/material';
import DisplayData from '../DisplayData';
import SecondPanel from '../secondPanelComponents/SecondPanel';
import TopFirstPanel from '../firstPanelComponents/TopFirstPanel';
import TopThirdPanel from './TopThirdPanel';

const ThirdPanel = ({ selectedItemList, group, allItems, onItemClick, selectedItem}) => {
  const { secondPanelContent } = useContext(PanelContext);
  const [showTable, setShowTable] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [itemID, setItemID] = useState('');
  const [itemCode, setItemCode] = useState('');
  const [itemName, setItemName] = useState('');
  const [skuNumber, setSkuNumber] = useState('');
  const [itemNumber, setItemNumber] = useState('');
  const [numberOfEntries, setNumberOfEntries] = useState(1);
  const [items, setItems] = useState([]);


  // const [selectedItem, setSelectedItem] = useState(null);
  const [thirdPanelData, setThirdPanelData] = useState(null);
  const [showForm, setShowForm] = useState(false); // State to manage form visibility
  const [formData, setFormData] = useState({
    childName: '',
    childDescription: '',
    file: null,
  });

  const handleItemSelected = (itemData) => {
    setThirdPanelData(itemData); // Update third panel data on item selection
  };



  const theme = createTheme({
    palette: {
      primary: {
        main: "#F70F0F", // Set the primary color to red
      },
    },
  });


  // Function to fetch items
  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getItems');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  useEffect(() => {
    fetchItems(); // Fetch items on component mount
  }, []);



  const handleViewItems = () => {
    // Reset visibility to show the form
    setShowTable(false);
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      file: file,
    }));
  };

  const handleAddChild = () => {
    setShowForm(true);
  };

  const handleSubmit = () => {
    // Handle form submission, you can send the formData to the server here
    console.log(formData);
    // Reset form data
    setFormData({
      childName: '',
      childDescription: '',
      file: null,
    });
    // Hide the form after submission
    setShowForm(false);
  };




  return (
    <div>
      <div>
          {selectedItemList && <TopThirdPanel items={allItems} onItemClick={onItemClick} group={group} selectedItemList={selectedItemList} />}

        </div>
      <div style={{width: "30%"}}>
        <div>
          {selectedItemList && (
            <div style={{textAlign: "left", paddingLeft: "10px"}}>
              {/* Third Panel Content */}
              <p>Item Number: #{selectedItemList.ItemNumber}</p>
              <p>Name: {selectedItemList.PItemName}</p>
              <p>SKU Number: {selectedItemList.SKUNumber}</p>
              <p>Code: {selectedItemList.ItemCode}</p>
              
              {/* You can add more details based on your data structure */}
              {/* <Box sx={{ marginBottom: 2 }}>
                <Button variant='contained' color='error' onClick={handleAddChild}>
                  Add Child
                </Button>
              </Box> */}
              {showForm && (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        // fullWidth
                        label='Child Name'
                        name='childName'
                        value={formData.childName}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        // fullWidth
                        label='Child Description'
                        name='childDescription'
                        value={formData.childDescription}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <input type='file' accept='.pdf,.doc,.docx' onChange={handleFileInputChange} />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type='submit' variant='contained' color='error'>
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
      <div style={{width: "70%"}}></div>

    </div>
  );
};

export default ThirdPanel