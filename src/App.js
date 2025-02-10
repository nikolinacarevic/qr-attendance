import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SubjectsPage from './components/SubjectsPage';
import ScanPage from './components/ScanPage';  
import Reports from './components/Reports';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SubjectsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default App;
