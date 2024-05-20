import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, useMediaQuery } from '@mui/material';

const TagsView = () => {
  const [availableTags, setAvailableTags] = useState([]);
  const [usedTags, setUsedTags] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    // Fetch data for available tags from dtags table
    const fetchAvailableTags = async () => {
      try {
        const response = await axios.get('http://localhost:3000/fetch-dtags');
        setAvailableTags(response.data);
      } catch (error) {
        console.error('Error fetching available tags:', error);
      }
    };

    // Fetch data for used tags from tags table
    const fetchUsedTags = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tags');
        setUsedTags(response.data);
      } catch (error) {
        console.error('Error fetching used tags:', error);
      }
    };

    fetchAvailableTags();
    fetchUsedTags();
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: isMobile ? "column" : "row", gap: 2 }}>
      {/* Available Tags Table */}
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Typography variant="h6" component="div" sx={{ p: 2 }}>Available Tags: {availableTags.length}</Typography>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
              <TableCell>ID</TableCell>
              <TableCell>Tag Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ display: 'block', maxHeight: 500, overflow: 'auto' }}>
            {availableTags.map((tag) => (
              <TableRow key={tag.Id} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                <TableCell>{tag.Id}</TableCell>
                <TableCell>{tag.TID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Used Tags Table */}
      <TableContainer component={Paper} sx={{ flex: 1 }}>
        <Typography variant="h6" component="div" sx={{ p: 2 }}>Used Tags: {usedTags.length}</Typography>
        <Table stickyHeader>
          <TableHead>
            <TableRow sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
              <TableCell>ID</TableCell>
              <TableCell>Tag Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ display: 'block', maxHeight: 500, overflow: 'auto' }}>
            {usedTags.map((tag) => (
              <TableRow key={tag.TID} sx={{ display: 'table', width: '100%', tableLayout: 'fixed' }}>
                <TableCell>{tag.TID}</TableCell>
                <TableCell>{tag.TagID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TagsView;
