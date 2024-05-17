import React, { createContext, useContext, useState } from 'react';

const CatalogContext = createContext();

export const useItemUpdateContext = () => useContext(CatalogContext);

export const ItemUpdateProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const updateItems = (newItems) => {
    setItems(newItems);
  };

  return (
    <CatalogContext.Provider value={{ items, updateItems }}>
      {children}
    </CatalogContext.Provider>
  );
};
