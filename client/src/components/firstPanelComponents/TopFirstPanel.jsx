import { Box, Button, Divider, IconButton, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

function TopFirstPanel({ handleOpen }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearch, setShowSearch] = useState(false);

    const handleSearchIconClick = () => {
        setShowSearch(!showSearch);
    };

    const handleSearchTextChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        handleSearch(query);
    };
    return (
        <div style={{borderBottom: '1px solid rgba(0, 0, 0, 0.12)', boxShadow: '0px 1px 0.5px -0.5px rgba(0,0,0,0.2), 0px 0.5px 0.5px 0px rgba(0,0,0,0.14), 0px 0.5px 1px 0px rgba(0,0,0,0.12)'}}>
            {/* <h2>Items List</h2> */}
            <Box sx={{ display: "flex", flexDirection: "row" }}>
                <Box sx={{ marginLeft: "10px", padding: "5px 3px 5px 3px", border: "1px solid #d32f2f", backgroundColor: "#d32f2f", color: "#fff", borderRadius: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "auto", height: "16px" }}>
                    <BookmarksIcon/>
                </Box>
                <Typography align='left' pl={1} variant="h6" color='#5c5c5c' noWrap>
                    Products
                </Typography>
            </Box>
            {/* <Typography align='left' pl={2} variant="h5" color='#5c5c5c' noWrap>
                Items List
            </Typography> */}
            {/* <Box sx={{ display: "flex", justifyContent: "left", mt: 2, ml: 2 }}>
                <Button onClick={handleOpen} variant="contained" color="error">Add New</Button>
            </Box> */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0, ml: 2, mr: 2 }}>
                {/* <Button onClick={handleOpen} variant="contained" color="error">Add New</Button> */}
                <Button startIcon={<AddBoxIcon />} onClick={handleOpen} variant='text' color='error' sx={{ textTransform: 'none', fontSize: "16px" }}>Add</Button>
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
        </div>
    )
}

export default TopFirstPanel