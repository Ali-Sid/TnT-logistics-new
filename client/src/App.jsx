import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import DisplayData from './components/DisplayData'
import TestPassingData from './components/TestPassingData'
import ParentComponent from './components/TestComponents/ParentComponent'
import TestThird from './components/TestThird'
import Packing from './components copy/Packing'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestBarcodeFetch from './components copy/TestBarcodeFetch'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<TestBarcodeFetch />} />
        <Route path='/resources/packing' element={<Packing />} />
        <Route path='/resources/items' element={<Home />} />
        <Route path='/associate' element={<TestThird />} />
      </Routes>
    </Router>
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
