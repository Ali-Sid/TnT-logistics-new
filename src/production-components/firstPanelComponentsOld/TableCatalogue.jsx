import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

function TableCatalogue({ itemCode }) {
    const [data, setData] = useState([]);


    // Error handling
    if (!items || !Array.isArray(items) || items.length === 0) {
        return <div>No data available.</div>;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/getItems`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (itemCode) { // Ensure itemCode is provided before fetching
            fetchData();
        }
    }, [itemCode]); // Dependency array to refetch data when itemCode changes

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Code</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>SKU Number</TableCell>
                            {/* Add more headers as needed */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.ItemCode}</TableCell>
                                <TableCell>{row.Name}</TableCell>
                                <TableCell>{row.SKUNumber}</TableCell>
                                {/* Add more cells as needed */}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableCatalogue