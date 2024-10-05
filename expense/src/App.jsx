// src/App.jsx

import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from './pages/signup';
import Dashboard from './pages/DashBoard';


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />  {/* Dashboard route */}
      </Routes>
    </Router>
  );
}

export default App;
