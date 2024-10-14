import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('/api/expenses');
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses", error);
    }
  };

  const handleInputChange = (e) => {
    setNewExpense({ ...newExpense, [e.target.name]: e.target.value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/expenses', newExpense);
      setExpenses([...expenses, response.data]);
      setNewExpense({ description: '', amount: '' });
    } catch (error) {
      console.error("Error adding expense", error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Expenses</h2>
      <form onSubmit={handleAddExpense}>
        <input
          type="text"
          name="description"
          value={newExpense.description}
          onChange={handleInputChange}
          placeholder="Description"
          required
        />
        <input
          type="number"
          name="amount"
          value={newExpense.amount}
          onChange={handleInputChange}
          placeholder="Amount"
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>{expense.description}: Rp {expense.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Expenses;
