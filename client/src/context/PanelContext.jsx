import React, { useState, createContext } from 'react';

export const PanelContext = createContext();

export const PanelProvider = ({ children }) => {
  const [firstPanelContent, setFirstPanelContent] = useState('');
  const [secondPanelContent, setSecondPanelContent] = useState('');
  const [thirdPanelContent, setThirdPanelContent] = useState('');
  const [selectedItemList, setSelectedItemList] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <PanelContext.Provider value={{
      firstPanelContent,
      setFirstPanelContent,
      secondPanelContent,
      setSecondPanelContent,
      thirdPanelContent,
      setThirdPanelContent,
      selectedItemList, setSelectedItemList,
      selectedItem,
      setSelectedItem,
    }}>
      {children}
    </PanelContext.Provider>
  );
};
