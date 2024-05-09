import { Box, Input, Button, TextField, ThemeProvider, Typography, createTheme, useMediaQuery, IconButton, MenuItem, Menu } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { PanelContext } from '../../context/PanelContext';
import axios from 'axios';
import SaveIcon from '@mui/icons-material/Save';
import DisabledByDefault from '@mui/icons-material/DisabledByDefault';
// import { FaCalendarAlt } from "react-icons/fa";
import BoxImage from '../../assets/box_685388.png';


function NewItemCatalog({ itemMaster, selectedItem, onItemAdded, onCloseDialog }) {
    // const { secondPanelContent } = useContext(PanelContext);
    const isMobile = useMediaQuery('(max-width:600px)');
    const [showTable, setShowTable] = useState(false);
    // const isMobile = useMediaQuery('(max-width:600px)');
    const [itemID, setItemID] = useState('');
    const [itemCode, setItemCode] = useState('');
    const [itemName, setItemName] = useState('');
    const [skuNumber, setSkuNumber] = useState('');
    const [itemNumber, setItemNumber] = useState('');
    const [numberOfEntries, setNumberOfEntries] = useState(selectedItem.ProCapPerShift);
    const [items, setItems] = useState([]);
    const [shift, setShift] = useState('');
    const [sku, setSKU] = useState('');
    // const [capacity, setCapacity] = useState(selectedItem.ProCapPerShift);
    const [isChecked, setIsChecked] = useState(false);
    // const [location, setLocation] = useState('Factory 1 - Production Area');
    // const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initialize selectedDate state
    const [selectedItemName, setSelectedItemName] = useState('');
    const [batchCode, setBatchCode] = useState('');
    const [machineName, setMachineName] = useState(selectedItem.Name);
    const [machineLocation, setMachineLocation] = useState(selectedItem.MachineLocation);
    const [prodDetails, setProdDetails] = useState('');
    const [itemSelectedID, setItemSelectedID] = useState(selectedItem.ID);

    // Function to handle checkbox change
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    // Function to set current date as default value for selectedDate on component mount
    useEffect(() => {
        const currentDate = new Date();
        setSelectedDate(currentDate.toISOString().split('T')[0]);
        setItemName(selectedItem.ItemDesc);
        setSkuNumber(selectedItem.SKU);
    }, [selectedItem]);



    const theme = createTheme({
        palette: {
            primary: {
                main: "#F70F0F", // Set the primary color to red
            },
        },
    });



    const handleSubmit = async (event) => {
        event.preventDefault();

        // Loop through the number of entries specified by the user
        for (let i = 0; i < numberOfEntries; i++) {
            try {
                console.log(`Iteration ${i + 1} of ${numberOfEntries}`);
                const uniqueNumber = `${itemNumber}${i + 1}`;

                console.log(`Sending data:`, { itemName, itemID, skuNumber, currentDate: selectedDate, itemNumber: uniqueNumber, itemSelectedID, shift });




                const response = await axios.post('http://localhost:3000/addItem', { machineName, machineLocation, currentDate: selectedDate, shift, sku, selectedItemName, batchCode, prodDetails, itemNumber: uniqueNumber, itemSelectedID }, {
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
        // window.location.reload()
    };

    const handleCancel = () => {
        // Call the onCloseDialog function passed from the parent component
        if (onCloseDialog) {
            onCloseDialog();
        }
    };

    const options = [
        { value: 'firstShift', label: 'First Shift' },
        { value: 'secondShift', label: 'Second Shift' },
        { value: 'thirdShift', label: 'Third Shift' },
    ];

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
                        alt="Box Image"
                        src={BoxImage}
                    />
                </Box>
                <Box component="form" onSubmit={handleSubmit}
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '90%' },
                        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: isMobile ? "center" : "left", width: !isMobile ? "50%" : "100%", pl: "20px"
                    }}>
                    <div style={{ width: isMobile && "100%" }}>
                        <Typography sx={{marginLeft: "10px"}} variant='h5'>{selectedItem.Name}</Typography>
                        <Typography sx={{marginLeft: "10px"}} color="grey" variant='h6'>Location: {selectedItem.MachineLocation}</Typography>
                        <div style={{ margin: "10px", display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
                            <Typography>Production Plan For </Typography>
                            <Input type='date' value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                        </div>
                        <TextField select label="Select Shift" value={shift} onChange={(e) => setShift(e.target.value)}>
                            {options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            label="Select SKU for production"
                            value={sku}
                            onChange={(e) => {
                                const selectedSKU = e.target.value;
                                const selectedItem = itemMaster.find(option => option.SKU === selectedSKU);
                                setSKU(selectedSKU);
                                setSelectedItemName(selectedItem ? selectedItem.ItemDesc : '');
                            }}
                        >
                            {itemMaster.map((option) => (
                                <MenuItem key={option.ID} value={option.SKU}>
                                    {option.SKU}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Typography sx={{ marginLeft: "10px", color: "grey" }}>{selectedItemName}</Typography>
                        <TextField value={batchCode} onChange={(e) => setBatchCode(e.target.value)} label="Batch Code" />
                        <TextField value={prodDetails} onChange={(e) => setProdDetails(e.target.value)} label="Production Details" />

                        {/* <TextField fullWidth label="SKU Number" onChange={(e) => setSkuNumber(e.target.value)} /> */}
                        <ThemeProvider theme={theme}>
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
                                autoFocus margin='dense' label='Production Capacity' type='number' fullWidth name='numberOfEntries' value={numberOfEntries}
                                onChange={(e) => setNumberOfEntries(e.target.value)} />
                        </ThemeProvider>
                        <TextField label="Item Number Starts From" onChange={(e) => setItemNumber(e.target.value)} />
                        {/* <Button type='submit' variant='contained' sx={{ width: "90%", mt: 2, ml: 1 }} color='error'>Add Item</Button>
                        <Button variant='contained' sx={{
                            width: "90%", mt: 2, ml: 1, backgroundColor: "white", color: "#d32f2f", '&:hover': {
                                backgroundColor: '#d32f2f',
                                color: '#fff'
                            },
                        }} onClick={handleCancel}>Cancel</Button> */}
                        <div style={{ display: "flex", flexDirection: "row", margin: "10px" }}>
                            <Input checked={isChecked} onChange={handleCheckboxChange} type='checkbox' /><Typography>Autogenerate Barcode Values</Typography>
                        </div>
                        {isChecked && (
                            <TextField label="Item Code Starts From" value={itemNumber} onChange={(e) => setItemNumber(e.target.value)} />
                        )}
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

export default NewItemCatalog