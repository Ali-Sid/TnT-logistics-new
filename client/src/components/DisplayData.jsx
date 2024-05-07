import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function DisplayData({ selectedItem }) {
    const [items, setItems] = useState([]);


    // Function to fetch items
    const fetchItems = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/getItems`);
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems(); // Fetch items on component mount
    }, []);
    return (
        <div>
            <TableContainer component={Paper} sx={{ maxHeight: '100%', overflowY: "auto" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Number</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>SKU Number</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item.ItemID}>
                                <TableCell>
                                    {item.ItemNumber}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {item.Name}
                                </TableCell>
                                <TableCell>{item.SKUNumber}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DisplayData