import { Box, Button, InputLabel, MenuItem, MenuList, Paper, Select, TextField, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'
import React, { useContext, useState } from 'react'
import { PanelContext } from '../../context/PanelContext';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';
import BoxImage from '../../assets/box_685388.png'

function NewItems({ onItemAdded, onCloseDialog }) {
    // const { secondPanelContent } = useContext(PanelContext);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [showTable, setShowTable] = useState(false);
    // const isMobile = useMediaQuery('(max-width:600px)');
    const [itemID, setItemID] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemType, setItemType] = useState('');
    const [itemNumber, setItemNumber] = useState('');
    const [numberOfEntries, setNumberOfEntries] = useState(1);
    const [items, setItems] = useState([]);


    const theme = createTheme({
        palette: {
            primary: {
                main: "#F70F0F", // Set the primary color to red
            },
        },
    });



    const handleSubmit = async (event) => {
        event.preventDefault();
        // Validate input
        if (!itemName || !itemCode) {
            alert('Please fill in all fields.');
            return;
        }

        // Loop through the number of entries specified by the user
            try {
                const response = await axios.post('http://localhost:3000/addPackingMaster', { itemName, itemCode, itemType }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status !== 201) {
                    throw new Error('Network response was not ok');
                }

                console.log(response.data);
            } catch (error) {
                console.error('There was a problem with your Axios request:', error);
            }

        if (onItemAdded) {
            onItemAdded();
        }
        // Fetch the latest items after adding a new item
        // fetchItems();
        // Toggle visibility to show the table
        setShowTable(true);

        if (onCloseDialog) {
            onCloseDialog();
        }
        window.location.reload()
    };

    const handleCancel = () => {
        // Call the onCloseDialog function passed from the parent component
        if (onCloseDialog) {
            onCloseDialog();
        }
    };

    return (
        <div>
            <Box sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", width: isMobile ? "100%" : "100vw", justifyContent: isMobile && "center", alignItems: isMobile && "center", gap: isMobile && "10px" }}>
                <Box sx={{ width: isMobile ? "100%" : "50%", display: "flex", flexDirection: "column", mt: "10px", justifyContent: isMobile ? "center" : "top", alignItems: isMobile ? "center" : "end" }}>
                    <Box
                        component="img"
                        sx={{
                            // height: 500,
                            // width: 500,
                            maxHeight: { xs: 233, md: 300 },
                            maxWidth: { xs: 350, md: 300 },
                            width: "100%",
                            objectFit: "cover",
                        }}
                        alt="The house from the offer."
                        src={BoxImage}
                    />
                </Box>
                <Box component="form" onSubmit={handleSubmit}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '90%' },
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: isMobile ? "center" : "left", width: !isMobile ? "50%" : "100%", pl: "20px"
                    }}>
                    <div style={{ width: isMobile && "100%" }}>
                        <TextField fullWidth label="Item Code" value={itemCode} onChange={(e) => setItemCode(e.target.value)} />
                        <TextField fullWidth label="Item Name" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                        <TextField
                            select
                            fullWidth
                            label="Type"
                            value={itemType}
                            onChange={(e) => setItemType(e.target.value)}
                        >
                            <MenuItem value="Box">Box</MenuItem>
                            <MenuItem value="Palette">Palette</MenuItem>
                            <MenuItem value="Container">Container</MenuItem>
                        </TextField>
                        {/* <ThemeProvider theme={theme}>
                            <TextField
                                sx={{
                                    "& .MuiInputLabel-root": { color: "#F70F0F" }, // Target label for red color
                                    "& .MuiOutlinedInput-root": { // Target outlined input for red border
                                        "& fieldset": {
                                            // backgroundColor: "#FFF",
                                            // color: "#000",
                                        },
                                    },
                                }}
                                autoFocus margin='dense' label='Repeat' type='number' fullWidth name='numberOfEntries' value={numberOfEntries}
                                onChange={(e) => setNumberOfEntries(e.target.value)} />
                        </ThemeProvider> */}
                        {/* <TextField label="Item Number Starts From" onChange={(e) => setItemNumber(e.target.value)} /> */}

                        {/* <Button type='submit' variant='contained' sx={{ width: "90%", mt: 2, ml: 1 }} color='error'>Add Item</Button>
                        <Button variant='contained' sx={{
                            width: "90%", mt: 2, ml: 1, backgroundColor: "white", color: "#d32f2f", '&:hover': {
                                backgroundColor: '#d32f2f',
                                color: '#fff'
                            },
                        }} onClick={handleCancel}>Cancel</Button> */}

                        <div style={{ width: "90%", marginLeft: "7px", display: "flex", flexDirection: "column", marginTop: "10px", gap: "10px", justifyContent: "space-around", alignItems: "center" }}>
                            <Button type='submit' fullWidth startIcon={<SaveIcon />} variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "16px" }}>Save</Button>
                            <Button fullWidth startIcon={<DisabledByDefault />} variant='outlined' color='error' onClick={handleCancel} sx={{ textTransform: 'none', fontSize: "16px" }}>Cancel</Button>
                        </div>
                    </div>
                </Box>
            </Box>
        </div>
    )
}

export default NewItems