import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SubjectsPage from './components/SubjectsPage';
import ScanPage from './components/ScanPage';  
import Reports from './components/Reports';
import AttendPage from './components/AttendPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SubjectsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/scan" element={<ScanPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/attend" element={<AttendPage />} />
      </Routes>
    </div>
  );
}

export default App;
