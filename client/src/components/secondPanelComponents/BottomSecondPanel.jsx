// BottomSecondPanel.js
import React, { useState } from 'react';
import { Divider, List, ListItemButton, ListItemText, Typography } from '@mui/material';

const BottomSecondPanel = ({ items, onItemClick, tags }) => {
  // const [tags, setTags] = useState([]);
  // const [getitems, setGetItems] = useState([]);



  return (
    <div style={{ maxHeight: "calc(100vh - 150px)", flex: "1 1 auto", overflow: "auto" }}>
      {/* <Typography align='left' pl={2} variant="h5" color='#5c5c5c' noWrap>
        Items Catalogue
      </Typography> */}
      <List>
        {items.map((item) => {
          const itemTag = tags.find(tag => tag.TagID === item.TagID);
          const barcode = itemTag ? itemTag.Barcode : 'No Tag attached';

          return (
            <div key={item.ItemID}>
              <ListItemButton
                onClick={() => onItemClick(item)}
                sx={{
                  '&:hover': {
                    backgroundColor: '#d32f2f',
                    '& .MuiTypography-root': { // Target Typography component for secondary text
                      color: 'white'
                    }
                  }
                }}
              >
                <ListItemText
                  primary={item.Name}
                  secondary={
                    <>
                      {/* No need for commented-out Typography component */}
                      {barcode}
                      {/* Display item.ItemNumber directly */}
                    </>
                  }
                />
              </ListItemButton>
              <Divider sx={{ marginBottom: "-10px" }} />
            </div>
          );
        })}
      </List>

    </div>
  );
};

export default BottomSecondPanel;
