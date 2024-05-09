import React, { useContext, useEffect, useState } from 'react';
import { useMediaQuery } from '@mui/material';
import FirstPanel from './firstPanelComponents/FirstPanel';
import SecondPanel from './secondPanelComponents/SecondPanel';
import ThirdPanel from './thirdPanelComponents/ThirdPanel';
import { PanelContext, PanelProvider } from '../context/PanelContext';
import axios from 'axios';
import TestPassingData from './TestPassingData';
import TestThird from './TestThird';

function Home() {
    const isMobile = useMediaQuery('(max-width:600px)'); // Adjust breakpoint as needed

    const [firstPanelContent, setFirstPanelContent] = useState('');
    const [secondPanelContent, setSecondPanelContent] = useState('');
    const [thirdPanelContent, setThirdPanelContent] = useState('');
    const [activePanel, setActivePanel] = useState(1); // 1 for first panel, 2 for second panel, 3 for third panel
    // const { selectedItemList, setSelectedItemList } = useContext(PanelContext);
    const [selectedItemList, setSelectedItemList] = useState(null)

    const [items, setItems] = useState([]);
    const [group, setGroup] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [machines, setMachines] = useState([])

    // Function to fetch items
    const fetchItems = async () => {
        try {
            // const response = await axios.get('http://localhost:3000/items-master');
            const response = await axios.get('http://localhost:3000/machines');
            // const groupedItems = groupItems(response.data);
            // setGroup(groupedItems);

            // setItems(response.data);
            setMachines(response.data)
            // console.log(response.data)
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    useEffect(() => {
        fetchItems(); // Fetch items on component mount
    }, []);

    // const groupItems = (items) => {
    //     const groupedItems = {};
    //     items.forEach((item) => {
    //         if (!groupedItems[item.Name]) {
    //             groupedItems[item.Name] = item;
    //         }
    //     });
    //     return Object.values(groupedItems);
    // };

    const handleItemClick = (item) => {
        // Toggle selected item
        setSelectedItem(selectedItem === item ? null : item);
        setActivePanel(2);
    };

    const handleItemClick2 = (item) => {
        // Toggle selected item
        setSelectedItemList(item);
        setActivePanel(3);
    };




    const handleFirstPanelClick = (content) => {
        setFirstPanelContent(content);
        setSecondPanelContent('');
        setThirdPanelContent('');
        setActivePanel(2); // Show second panel in mobile view
    };

    const handleSecondPanelClick = (content) => {
        setSecondPanelContent(content);
        setThirdPanelContent('');
        setActivePanel(3); // Show third panel in mobile view
    };

    return (
        <PanelProvider>
            <div style={{
                display: 'flex', height: '100vh', width: "100%", // Prevent scrollbars
                boxSizing: 'border-box'
            }}>
                {(isMobile && activePanel === 1) && (
                    <div style={{
                        width: '100%',
                        height: "100%",
                        boxSizing: 'border-box'
                    }} 
                    // onClick={() => handleFirstPanelClick('')}
                    >
                        <FirstPanel itemsMaster={items}  handleItemClick={handleItemClick} />
                    </div>
                )}
                {(isMobile && activePanel === 2) && (
                    <div style={{
                        width: '100%',
                        height: "100%",
                        boxSizing: 'border-box'
                    }} onClick={() => handleSecondPanelClick('')}>
                        <SecondPanel selectedItem={selectedItem} items={items} onItemClick={handleItemClick2} handleItemClick={handleItemClick} />
                        {/* <TestPassingData selectedItem={selectedItem} items={items} onItemClick={handleItemClick2} /> */}
                    </div>
                )}
                {(isMobile && activePanel === 3) && (
                    <div style={{
                        width: '100%',
                        height: "100%",
                        boxSizing: 'border-box'
                    }}>
                        <ThirdPanel group={group} allItems={items} selectedItem={selectedItem} selectedItemList={selectedItemList} setActivePanel={setActivePanel} />
                        {/* <TestThird selectedItemList={selectedItemList} /> */}
                    </div>
                )}
                {!isMobile && (
                    <div style={{
                        flexGrow: 1,
                        minWidth: 0,
                        width: '20%',
                        height: "100%",
                        // borderRight: '0.5px solid #A59C94',
                        boxSizing: 'border-box'
                    }}>
                        <FirstPanel itemsMaster={items} handleItemClick={handleItemClick} />
                    </div>
                )}
                {!isMobile && (
                    <div style={{
                        flexGrow: 1,
                        minWidth: 0,
                        width: '20%',
                        height: "100%",
                        // borderRight: '0.5px solid #A59C94',
                        boxSizing: 'border-box'
                    }}>
                        <SecondPanel selectedItem={selectedItem} items={items} onItemClick={handleItemClick2} handleItemClick={handleItemClick} />
                        {/* <TestPassingData selectedItem={selectedItem} items={items} onItemClick={handleItemClick2} /> */}
                    </div>
                )}
                {!isMobile && (
                    <div style={{
                        flexGrow: 2,
                        minWidth: 0,
                        width: '60%',
                        height: "100%",
                        boxSizing: 'border-box'
                    }}>
                        <ThirdPanel selectedItem={selectedItem} allItems={items} onItemClick={handleItemClick2} group={group} selectedItemList={selectedItemList} />
                        {/* <TestThird selectedItemList={selectedItemList} /> */}
                    </div>
                )}
            </div>
        </PanelProvider>
    );
}

export default Home;
