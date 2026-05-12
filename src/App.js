import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/admin-dashboard.js';
import ProtectedRoute from './protectedRoute.js';
import VoterDashboard from './pages/voter/voter-dashboard.js';
import CandidateRegister from './pages/candidate/candidate-register.js';
import VoterRegister from './pages/voter/voter-register.js';
import Login from './pages/login.js'; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/voter-dashboard" element={<ProtectedRoute allowedRole="voter"><VoterDashboard /></ProtectedRoute>} />
        <Route path="/candidate-register" element={<ProtectedRoute allowedRole="admin"><CandidateRegister /></ProtectedRoute>} />
        <Route path="/voter-register" element={<ProtectedRoute allowedRole="admin"><VoterRegister /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}