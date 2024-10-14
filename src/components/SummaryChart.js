import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';
import axios from 'axios';

// Mendaftarkan skala yang diperlukan
Chart.register(CategoryScale, LinearScale, BarElement);

const SummaryChart = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    // Fetch payment summary
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/payments/summary');
        setPaymentData(response.data);
      } catch (error) {
        console.error("Error fetching payment data", error);
      }
    };

    // Fetch expense summary
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('/api/expenses/summary');
        setExpenseData(response.data);
      } catch (error) {
        console.error("Error fetching expense data", error);
      }
    };

    fetchPayments();
    fetchExpenses();
  }, []);

  const paymentChartData = {
    labels: paymentData.monthlyPayments?.map(m => `Month ${m.month}`) || [],
    datasets: [
      {
        label: 'Monthly Payments',
        data: paymentData.monthlyPayments?.map(m => m.total) || [],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const expenseChartData = {
    labels: expenseData.monthlyExpenses?.map(m => `Month ${m.month}`) || [],
    datasets: [
      {
        label: 'Monthly Expenses',
        data: expenseData.monthlyExpenses?.map(m => m.total) || [],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Months',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Amount',
        },
      },
    },
  };

  return (
    <div>
      <h2>Payment Summary</h2>
      <Bar data={paymentChartData} options={options} />
      <h2>Expense Summary</h2>
      <Bar data={expenseChartData} options={options} />
    </div>
  );
};

export default SummaryChart;
