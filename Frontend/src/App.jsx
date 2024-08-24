import { useState } from 'react'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Landing from './pages/Landing'
import HomePage from './pages/HomePage'
function App() {
    return (
      <BrowserRouter>
    
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />

        
        
        
      </Routes>
      
    </BrowserRouter>
    )
}

export default App
