import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [newPayment, setNewPayment] = useState({
    residentId: '',
    amount: '',
    type: 'Kebersihan'
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('/api/payments');
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleAddPayment = async () => {
    try {
      const response = await axios.post('/api/payments', newPayment);
      setPayments([...payments, response.data]);
      setNewPayment({ residentId: '', amount: '', type: 'Kebersihan' });
    } catch (error) {
      console.error("Error adding payment", error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Payments</h2>
      <ul className="list-group mb-4">
        {payments.map((payment) => (
          <li key={payment.id} className="list-group-item">
            {payment.residentId} - Rp {payment.amount} ({payment.type})
          </li>
        ))}
      </ul>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Resident ID"
          name="residentId"
          value={newPayment.residentId}
          onChange={handleInputChange}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Amount"
          name="amount"
          value={newPayment.amount}
          onChange={handleInputChange}
        />
        <select
          className="form-control"
          name="type"
          value={newPayment.type}
          onChange={handleInputChange}
        >
          <option value="Kebersihan">Kebersihan</option>
          <option value="Satpam">Satpam</option>
        </select>
        <button className="btn btn-primary" onClick={handleAddPayment}>Add Payment</button>
      </div>
    </div>
  );
};

export default Payments;
