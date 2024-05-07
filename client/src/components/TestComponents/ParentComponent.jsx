import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GroupedList from './GroupedList';
import SelectedList from './SelectedList';
import ItemDetails from './ItemDetails';

function ParentComponent() {
 const [items, setItems] = useState([]);
 const [groupedItems, setGroupedItems] = useState([]);
 const [selectedItem, setSelectedItem] = useState(null);
 const [selectedDetail, setSelectedDetail] = useState(null)

 const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getItems');
      const groupedItems = groupItems(response.data);
      setGroupedItems(groupedItems);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
 };

 useEffect(() => {
    fetchItems(); // Fetch items on component mount
 }, []);

 const groupItems = (items) => {
    const groupedItems = {};
    items.forEach((item) => {
      if (!groupedItems[item.Name]) {
        groupedItems[item.Name] = item;
      }
    });
    return Object.values(groupedItems);
 };

 const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedDetail(detail);
 };

 return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
      <GroupedList items={groupedItems} onItemClick={handleItemClick} />
      {selectedItem && <SelectedList item={selectedItem} />}
      {selectedItem && <ItemDetails item={selectedDetail} onItemClick={handleItemClick} />}
    </div>
 );
}

export default ParentComponent;
