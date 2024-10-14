import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SummaryChart from './SummaryChart'; // Assume this component exists

const Report = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
    fetchReportData();
  }, []);

  const fetchReportData = async () => {
    try {
      const response = await axios.get('/api/reports'); // Adjust API endpoint as needed
      setReportData(response.data);
    } catch (error) {
      console.error("Error fetching report data", error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Report</h2>
      {/* Render your summary chart or any other visualization */}
      <SummaryChart data={reportData} />
    </div>
  );
};

export default Report;
