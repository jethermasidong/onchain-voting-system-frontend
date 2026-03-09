import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/admin-dashboard.js';
import VoterDashboard from './pages/voter/voter-dashboard.js';
import CandidateRegister from './pages/candidate/candidate-register.js';
import VoterRegister from './pages/voter/voter-register.js';
import Login from './pages/login.js'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/voter-dashboard" element={<VoterDashboard />} />
        <Route path="/candidate-register" element={<CandidateRegister />} />
        <Route path="/voter-register" element={<VoterRegister />} />
      </Routes>
    </BrowserRouter>
  );
}