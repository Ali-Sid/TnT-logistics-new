import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './production-components/Home'
import OldComponent from './oldComponents/components/Home'
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
import LoginView from './login/login-view'
import { InitialNavigation } from './InitialNavigation'
import { LayoutWrapper } from './LayoutWrapper'
import TagsView from './TagsView/TagsView'

function App() {

  return (
    <>
      <Router>
        {/* <InitialNavigation /> */}

        <LayoutWrapper>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/resources/packing' element={<Packing />} />
            <Route path='/resources/machines' element={<Home />} />
            <Route path='/resources/items' element={<OldComponent />} />
            <Route path='/associate' element={<TestBarcodeFetch />} />
            <Route path='/tags' element={<TagsView />} />
            <Route path='/login' element={<LoginView />} />
          </Routes>
        </LayoutWrapper>

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
