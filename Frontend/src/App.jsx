import { useState } from 'react'
import './App.css'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import Landing from './pages/Landing'
function App() {
    return (
      <BrowserRouter>
    
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing" element={<Landing />} />
        
        <Route path="/" element={<Navigate to="/landing" />} />
        
      </Routes>
      
    </BrowserRouter>
    )
}

export default App
