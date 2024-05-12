// BottomSecondPanel.js
import React, { useEffect, useState } from 'react';
import { Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const BottomSecondPanel = ({ selectedItem, items, onItemClick, filteredItems }) => {
  // const [tags, setTags] = useState([])
  // const [packingItems, setPackingItems] = useState([]);


  const [tags, setTags] = useState([]);
  const [packingItems, setPackingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [packingResponse, tagsResponse] = await Promise.all([
          axios.get('http://localhost:3000/getPackingItems'),
          axios.get('http://localhost:3000/tags')
        ]);
        setPackingItems(packingResponse.data);
        setTags(tagsResponse.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setIsLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Fetch packing items from the backend
    const fetchPackingItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getPackingItems');
        setPackingItems(response.data);
      } catch (error) {
        console.error('Error fetching packing items:', error);
      }
    };

    fetchPackingItems();
  }, []);

  useEffect(() => {
    // Fetch all items from the backend
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tags');
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, []);





  return (
    <div style={{ maxHeight: "calc(100vh - 150px)", flex: "1 1 auto", overflow: "auto" }}>
      {/* <Typography align='left' pl={2} variant="h5" color='#5c5c5c' noWrap>
        Items Catalogue
      </Typography> */}
      <List>
        {filteredItems.map((item) => {
          const itemTag = tags.find(tag => tag.TagID === item.PItemTagID);
          const barcode = itemTag ? itemTag.Barcode : 'No Tags attached';
          return (
            <div key={item.PItemID}>
              <ListItemButton
                onClick={() => onItemClick(item)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                    '& .MuiTypography-root': { // Target Typography component for secondary text
                      color: 'white',
                    },
                  },
                }}
              >
                <ListItemText primary={item.PItemNumber} secondary={
                  <>
                    <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='#a8a7a7'>
                      {barcode}
                    </Typography>
                  </>
                } />
              </ListItemButton>
              <Divider sx={{ marginBottom: "-10px" }} />
            </div>
          )
        }

        )}
      </List>
    </div>
  );
};

export default BottomSecondPanel;
