import React from 'react';

function SelectedList({ item, onItemClick }) {
 return (
    <div style={{display: "flex", flexDirection: "column"}}>
      <h2>{item.Name}</h2>
      {/* Assuming item has a list of sub-items or details to display */}
      {item.details && item.details.map((detail, index) => (
        <div key={index} onClick={() => onItemClick(detail)}>
          {detail.name}
        </div>
      ))}
    </div>
 );
}

export default SelectedList;
