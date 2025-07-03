import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom';
//import React, { useState } from 'react';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import CardPage from './pages/CardPage.tsx';
function App() {
  return (
    <Router >
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/cards" element={<CardPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="*" element = {<Navigate to="/" replace/> }/>
      </Routes>
    </Router>
  );
}
export default App; 