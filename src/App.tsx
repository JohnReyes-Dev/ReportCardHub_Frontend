import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import AddYourOwnComments from './Pages/AddYourOwnComments'



const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/AddYourOwnComments' element={<AddYourOwnComments/>}></Route>
      </Routes>
    </>
  )
}

export default App