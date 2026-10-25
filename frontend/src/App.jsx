import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Global Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import BeachList from './pages/BeachList';
import BeachDetails from './pages/BeachDetails';
import Safety from './pages/Safety';
import Alerts from './pages/Alerts';
import Emergency from './pages/Emergency';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';

/**
 * Main Application Component
 * Uses React Router (BrowserRouter) to route across all 9 features:
 * 1. Home (/)
 * 2. Beach Information & 3. Search Beaches (/beaches)
 * 4. Beach Details & 8. Reviews (/beaches/:id)
 * 5. Safety Guidelines (/safety)
 * 6. Safety Alerts (/alerts)
 * 7. Emergency Contacts (/emergency)
 * 9. Admin Dashboard (/admin)
 * Auth: Login & Register (/login, /register)
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Navigation Bar */}
        <Navbar />

        {/* Dynamic Route Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/beaches" element={<BeachList />} />
            <Route path="/beaches/:id" element={<BeachDetails />} />
            <Route path="/safety" element={<Safety />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* Catch-all route redirects to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
