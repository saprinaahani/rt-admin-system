import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import Houses from './components/Houses';
import Payments from './components/Payments';
import Expenses from './components/Expenses';
import Report from './components/Report';
import Residents from './components/Residents';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">RT Management</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                {/* Adjust the navigation links as per your routing */}
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/residents">Residents</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/houses">Houses</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/payments">Payments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/expenses">Expenses</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/report">Report</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/residents" element={<Residents />} />
            <Route path="/houses" element={<Houses />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-primary text-center text-white py-3">
          <p>© 2024 RT Management System</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
