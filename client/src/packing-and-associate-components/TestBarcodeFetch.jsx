import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useMediaQuery } from '@mui/material';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

function TestBarcodeFetch() {
    const [details, setDetails] = useState([]);
    const [packingDetails, setPackingDetails] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchResults2, setSearchResults2] = useState([]);
    const [tagId, setTagId] = useState('');
    const [inputValue, setInputValue] = useState(''); // Added for child resource input
    const [showSecondDiv, setShowSecondDiv] = useState(false); // State to control the visibility of the second div
    const [selectedParent, setSelectedParent] = useState(null);
    const [selectedChild, setSelectedChild] = useState(null);
    const [mainResID, setMainResID] = useState(null);
    const [mainResName, setMainResName] = useState(null);
    const [associateResID, setAssociateResID] = useState(null);
    const [associateResName, setAssociateResName] = useState(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    // Function to handle parent resource selection
    const handleParentSelect = (item) => {
        setSelectedParent(item);
        setMainResID(item.PItemID);
        setMainResName(item.Name || item.PItemName);
    };

    // Function to handle child resource selection
    const handleChildSelect = (item) => {
        setSelectedChild(item);
        setAssociateResID(item.ItemID);
        setAssociateResName(item.Name || item.PItemName);
    };

    
    // Function to save the selected resources
    const saveResources = async (searchResults, searchResults2) => {

        const selectedParent = searchResults[0];
        // const selectedChild = searchResults2[0];


        if (!selectedParent) {
            alert('Please enter the tag id of both parent and child resources.');
            return;
        }

        const dataToSend = {
            mainResID: selectedParent.ID,
            mainResName: selectedParent.Name || selectedParent.PItemName,
            associateRes: searchResults2.map(item => ({
                associateResID: item.ItemID || item.ID,
                associateResName: item.Name || item.PItemName
            }))
        };

        // if (selectedParent) {
        //     dataToSend.mainResID = selectedParent.ID;
        //     dataToSend.mainResName = selectedParent.Name || selectedParent.PItemName;
        //   }
        //   if (selectedChild) {
        //     dataToSend.associateResID = selectedChild.ID;
        //     dataToSend.associateResName = selectedChild.Name || selectedChild.PItemName;
        //   }
          console.log('Data to Send:', dataToSend)

        

        try {
            const response = await axios.post('http://localhost:3000/associate', dataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Data sending to backend:', response);
            console.log('Server response:', response.data, response.statusText);


            if (response.status === 200) {
                alert('Resources saved successfully.');
                // Optionally, clear selections and search results here
                setMainResID(null);
                setMainResName(null);
                setAssociateResID(null);
                setAssociateResName(null);
                setSearchTerm('');
                setInputValue('');
                setSearchResults([]);
                setSearchResults2([]);
                setSelectedParent(null);
                setSelectedChild(null);
            } 
            // else {
            //     alert('Failed to save resources.');
            // }
        } catch (error) {
            console.log('Error sending data', error)
            alert('Failed to save resources.');
        }
    };

    const fetchData = async (searchTerm) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/search', { searchTerm });
            setSearchResults(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setError('Failed to fetch data.');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchData2 = async (inputValue) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/search', { searchTerm: inputValue });
            const newItems = response.data.filter(item => !searchResults2.some(existingItem => existingItem.TagID === item.TagID));
            setSearchResults2(prevResults => [...prevResults, ...newItems]);
            setError(null);
        } catch (error) {
            console.error('Error fetching data: ', error);
            setError('Failed to fetch data.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            fetchData(searchTerm);
        }
    }, [searchTerm]); // Depend on searchTerm to trigger fetchData

    useEffect(() => {
        if (inputValue) {
            fetchData2(inputValue);
        }
    }, [inputValue]); // Depend on inputValue to trigger fetchData2

    // Function to toggle the visibility of the second div
    const toggleSecondDiv = () => {
        setShowSecondDiv(!showSecondDiv);
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", width: "100%" }}>
            <div style={{ width: isMobile ? "100%" : "30%" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <Box sx={{ marginLeft: "10px", padding: "5px 3px 5px 3px", border: "1px solid #d32f2f", backgroundColor: "#d32f2f", color: "#fff", borderRadius: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "auto", height: "16px" }}>
                        <BookmarksIcon />
                    </Box>
                    <Typography align='left' pl={1} variant="h5" color='#5c5c5c' noWrap>
                        Select Palette
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", mt: 0, ml: 2, mr: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Scan Tag"
                        type="text"
                        fullWidth
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Box>
                        {isLoading && <p>Loading details...</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div>
                            {/* <Typography variant="h6">Filtered Items:</Typography> */}
                            {searchResults && searchResults.map((item, index) => (
                                <div key={index}>
                                    <h2>{item.PItemTagID || item.TagID}</h2>
                                    <p>{item.Name || item.PItemName}</p>
                                    <p>{item.Source}</p>
                                    <p>{item.ID}</p>
                                    <Button color='error' variant='contained' onClick={toggleSecondDiv}>Add Boxes</Button>
                                    {/* <form>
                                        <input type="text" value={item.PItemID || item.TagID} />
                                    </form> */}
                                </div>
                            ))}
                        </div>
                    </Box>
                    {/* Button to toggle the visibility of the second div */}
                </Box>
            </div>
            {showSecondDiv && (
                <div style={{ width: isMobile ? "100%" : "70%" }}>
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                        <Box sx={{ marginLeft: "10px", padding: "5px 3px 5px 3px", border: "1px solid #d32f2f", backgroundColor: "#d32f2f", color: "#fff", borderRadius: "5px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", width: "auto", height: "16px" }}>
                            <BookmarksIcon />
                        </Box>
                        <Typography align='left' pl={1} variant="h5" color='#5c5c5c' noWrap>
                            Select Boxes
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", mt: 0, ml: 2, mr: 2 }}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Scan Barcode"
                            type="text"
                            fullWidth
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                        <Box sx={{overflow: "auto", maxHeight: "450px"}}>
                            {isLoading && <p>Loading details...</p>}
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            <div>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Tag ID</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>ID</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {searchResults2.map((item, index) => (
                                                <TableRow key={index}>
                                                    <TableCell component="th" scope="row">
                                                        {item.PItemTagID || item.TagID}
                                                    </TableCell>
                                                    <TableCell>{item.Name || item.PItemName}</TableCell>
                                                    <TableCell>{item.ID}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: "10px" }}>
                        <Button variant='contained' color='error' onClick={() => saveResources(searchResults, searchResults2)}>Save</Button>
                    </Box>
                </div>
            )}
        </div>
    );
}

export default TestBarcodeFetch;
