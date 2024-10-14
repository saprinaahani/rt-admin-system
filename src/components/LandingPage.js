// src/components/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-4">Welcome to the RT Management System</h1>
      <p className="lead">
        Manage residents, payments, expenses, and reports efficiently.
      </p>
      <Link to="/dashboard" className="btn btn-primary btn-lg mt-3">
        Go to Dashboard
      </Link>
    </div>
  );
};

export default LandingPage;
