import { Box, Button, Divider, Drawer, IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NumbersIcon from '@mui/icons-material/Numbers';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import axios from 'axios';

function TopThirdPanel({ selectedItemList, group, items, onItemClick }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedItem, setSelectedItem] = useState('');

    const filteredItems = selectedItem ? items.filter((item) => item.Name === selectedItem.Name) : [];
    const [openDialog, setOpenDialog] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const [tags, setTags] = useState([]);
    const [dtags, setDTags] = useState([]);

    useEffect(() => {
        // Function to fetch the tags from the backend
        const fetchTags = async () => {
            try {
                // Make a GET request to fetch the tags endpoint
                const response = await axios.get('http://localhost:3000/tags');
                const response2 = await axios.get('http://localhost:3000/fetch-dtags');

                // Update the state with the fetched tags
                setTags(response.data);
                setDTags(response2.data)
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        // Call the fetchTags function when the component mounts
        fetchTags();
    }, []); // Empty dependency array to ensure the effect runs only once



    const handleDialogOpen = () => {
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleSaveDialog = async () => {
        try {

            // 1. Fetch EPC value for the BarCode (assuming BarCode is the matching column)
            const response = await axios.get(`http://localhost:3000/fetch-dtags`); // Assuming GET /dtags/:id endpoint
            const dtagData = response.data;

            if (!dtagData) {
                console.error('DTag not found for BarCode:', inputValue);
                return; // Handle case where DTag is not found
            }

            const epc = dtagData.ECP;


            // Assuming the backend endpoint to save the data is /api/saveTag
            await axios.post('http://localhost:3000/saveTag', {
                BarCode: inputValue,
                QRCode: inputValue,
                NFC: inputValue,
                RFID: inputValue,
                ItemNumber: selectedItemList.ItemNumber,
                EPC: epc,
            });
            setOpenDialog(false);
            setInputValue(''); // Clear the input field
            // console.log('Tag Added Successfully', inputValue)

            // Fetch the updated tags from the backend to ensure the latest data is displayed
            const updatedTags = await axios.get('http://localhost:3000/tags');
            setTags(updatedTags.data); // Update the tags state with the fetched tags

        } catch (error) {
            console.error('Error saving tag:', error);
        }
    };

    const handleItemChange = (event) => {
        setSelectedItem(event.target.value);
    };


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearchIconClick = () => {
        setShowSearch(!showSearch);
    };

    const handleSearchTextChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };


    const handleClickMenu = (event, value) => {
        setAnchorEl(event.currentTarget);
        setSelectedItem(value);
    };




    return (
        <div style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)', boxShadow: '0px 1px 0.5px -0.5px rgba(0,0,0,0.2), 0px 0.5px 0.5px 0px rgba(0,0,0,0.14), 0px 0.5px 1px 0px rgba(0,0,0,0.12)' }}>
            {/* <h2>Items List</h2> */}
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Box sx={{ marginLeft: "10px", padding: "5px 3px 5px 3px", border: "1px solid #d32f2f", backgroundColor: "#d32f2f", color: "#fff", borderRadius: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "auto", height: "16px" }}>
                    <NumbersIcon />
                </Box>
                {/* <Typography align='left' pl={1} variant="h5" color='#5c5c5c' noWrap>
                    {selectedItemList && tags.find(tag => tag.TagID === selectedItemList.TagID)?.Barcode || (
                        <Button variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "12px", height: "28px" }} onClick={handleDialogOpen}>Add Tag</Button>
                    )}
                </Typography> */}
                <Typography align='left' pl={1} variant="h5" color='#5c5c5c' noWrap>
                    {selectedItemList ? (
                        selectedItemList.TagID  // Check directly for truthiness
                            ? <span>{selectedItemList.TagID}</span>
                            : <Button variant='contained' color='error' sx={{ textTransform: 'none', fontSize: "12px", height: "28px" }} onClick={handleDialogOpen}>Add Tag</Button>
                    ) : null}
                </Typography>
            </Box>
            {/* <Box sx={{ display: "flex", justifyContent: "left", mt: 2, ml: 2 }}>
                <Button onClick={handleOpen} variant="contained" color="error">Add New</Button>
            </Box> */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0, ml: 2, mr: 2 }}>
                {/* <Button onClick={handleOpen} variant="contained" color="error">Add New</Button> */}
                <Button startIcon={<AddBoxIcon />} variant='text' color='error' sx={{ textTransform: 'none', fontSize: "16px" }} onClick={toggleDrawer(true)}>Add Sub Items</Button>
                <IconButton onClick={handleSearchIconClick}>
                    <SearchIcon color='error' />
                </IconButton>
            </Box>
            {showSearch && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 2, ml: 2, mr: 2 }}>
                    <TextField
                        fullWidth
                        label="Search"
                        value={searchQuery}
                        onChange={handleSearchTextChange}
                        inputProps={{
                            style: {
                                paddingTop: 0, // Adjust padding to reduce height
                                paddingBottom: 0, // Adjust padding to reduce height
                                height: '36px', // Set the desired height
                            },
                            sx: {
                                fontSize: "1rem", // Default font size for the label
                                "&.Mui-focused": {
                                    fontSize: "1rem", // Font size when the TextField is focused

                                },

                            },
                        }}
                    // sx={{
                    //     "& label": {
                    //         transform: "translate(5px, 5px)", // Move the label upwards
                    //         transformOrigin: "top", // Adjust the origin of the transform
                    //     },
                    // }}
                    />
                </Box>
            )}
            {/* {isMobile && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button onClick={handleViewSecondPanel} variant="contained" color="error">View Catalogue</Button>
        </Box>
      )} */}
            <Dialog disableRestoreFocus open={openDialog} onClose={handleDialogClose}>
                <DialogTitle>Add Tag</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tag Number"
                        type="text"
                        fullWidth
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickMenu}>Select Tags</Button>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button onClick={handleSaveDialog}>Save</Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {dtags.map((dtag) => (
                            <MenuItem key={dtag.Id} value={dtag.TID} onClick={() => setInputValue(dtag.TID)}>
                                {dtag.TID}
                            </MenuItem>
                        ))}
                    </Menu>
                </DialogActions>
            </Dialog>
            {/* ----------------------------------------------- */}
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {/* Content of the drawer */}
                <Box sx={{ width: 500, paddingLeft: "10px" }}>
                    <Box>
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Add Sub Items
                        </Typography>
                        <Button startIcon={<AddBoxIcon />} variant='text' color='error' sx={{ textTransform: 'none', fontSize: "16px" }} aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}>Select Resources</Button>
                        <Button startIcon={<AddBoxIcon />} variant='text' color='error' sx={{ textTransform: 'none', fontSize: "16px" }}>Scan</Button>
                    </Box>
                    <Box>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            sx={{ width: "50%" }}
                            color='error'
                        >
                            Click to Select Resource
                        </Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>Items</MenuItem>
                            <MenuItem onClick={handleClose}>Packaging</MenuItem>
                            {/* <MenuItem onClick={handleClose}>People</MenuItem> */}
                        </Menu>
                        <TextField sx={{ width: "50%" }} select label="Select" value={selectedItem} onChange={handleItemChange}>
                            {group.map((item) => (
                                <MenuItem key={item.ItemID} value={item.ItemID}>
                                    {item.Name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField sx={{ width: "50%" }} select label="Select" value={selectedItem} onChange={handleItemChange}>
                            {filteredItems.map((item) => (
                                <MenuItem key={item.ItemID} value={item.ItemID}>
                                    {item.Name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Box>
                    {/* Add your form or content here */}
                </Box>
            </Drawer>
        </div>
    )
}

export default TopThirdPanel