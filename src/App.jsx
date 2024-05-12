import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './production-components/Home'
import DisplayData from './production-components/DisplayData'
import TestPassingData from './production-components/TestPassingData'
import ParentComponent from './production-components/TestComponents/ParentComponent'
import TestThird from './production-components/TestThird'
import Packing from './packing-and-associate-components/Packing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestBarcodeFetch from './packing-and-associate-components/TestBarcodeFetch'
import { useMediaQuery } from '@mui/material'
import Sidebar from './dashboard-components/Sidebar'
import BottomNav from './dashboard-components/BottomNav'
import Dashboard from './Dashboard'

function App() {
  const [count, setCount] = useState(0);
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <>
      <Router>

        {isMobile && (
          <div style={{ width: "100%", height: "100%" }}>
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/resources/packing' element={<Packing />} />
              <Route path='/resources/items' element={<Home />} />
              {/* <Route path='/associate' element={<TestThird />} /> */}
              <Route path='/associate' element={<TestBarcodeFetch />} />
            </Routes>
            <BottomNav />
          </div>

        )}

        {!isMobile && (
          <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "row" }}>
            <div style={{ width: "5%", height: "100%", borderRadius: "5px" }}>
              <Sidebar />
            </div>
            <div style={{ width: "95%", height: "100%", paddingTop: "2rem" }}>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/resources/packing' element={<Packing />} />
                <Route path='/resources/items' element={<Home />} />
                {/* <Route path='/associate' element={<TestThird />} /> */}
                <Route path='/associate' element={<TestBarcodeFetch />} />
              </Routes>
            </div>
          </div>
        )}

      </Router >
      {/* <Home /> */}
      {/* <Packing /> */}
      {/* <TestThird /> */}
      {/* <DisplayData /> */}
      {/* <TestPassingData /> */}
      {/* <NewItems /> */}
      {/* <ParentComponent /> */}
    </>
  )
}

export default App
