import React from 'react';

function GroupedList({ items, onItemClick }) {
 return (
    <div style={{display: "flex", flexDirection: "column"}}>
      {items.map((item) => (
        <div key={item.Name} onClick={() => onItemClick(item)}>
          {item.Name}
        </div>
      ))}
    </div>
 );
}

export default GroupedList;
