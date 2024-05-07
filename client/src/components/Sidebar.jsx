
import React from 'react';

const Sidebar = ({ isOpen }) => {
 if (!isOpen) return null;

 return (
    <div style={{ width: '25%', height: '100vh', backgroundColor: '#f5f5f5', padding: '1rem' }}>
      <h3>Sidebar</h3>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
 );
};

export default Sidebar;
