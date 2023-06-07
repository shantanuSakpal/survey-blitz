import React from "react";
import { Route, Routes } from "react-router-dom";  
import './App.css';
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<>homepage</>} />
      <Route exact path="/signIn" element={<SignIn />} />
      <Route exact path="/signUp" element={<SignUp />} />
    </Routes>
  )
}

export default App