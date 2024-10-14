import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [summary, setSummary] = useState({ totalResidents: 0, totalPayments: 0, totalHouses: 0 });

  useEffect(() => {
    fetchSummaryData();
  }, []);

  const fetchSummaryData = async () => {
    try {
      const [residentsResponse, paymentsResponse, housesResponse] = await Promise.all([
        axios.get('/api/residents'),
        axios.get('/api/payments'),
        axios.get('/api/houses')
      ]);
      setSummary({
        totalResidents: residentsResponse.data.length,
        totalPayments: paymentsResponse.data.reduce((sum, payment) => sum + payment.amount, 0),
        totalHouses: housesResponse.data.length
      });
    } catch (error) {
      console.error("Error fetching summary data", error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Dashboard</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Residents</h5>
              <p className="card-text">{summary.totalResidents}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Payments</h5>
              <p className="card-text">Rp {summary.totalPayments}</p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Houses</h5>
              <p className="card-text">{summary.totalHouses}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
