import React from 'react';

function ItemDetails({ item }) {
 return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h3>{item.Name}</h3>
      <p>{item.Description}</p>
      {/* Display other details of the selected item */}
    </div>
 );
}

export default ItemDetails;
