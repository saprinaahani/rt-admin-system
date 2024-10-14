import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Residents() {
  const API_URL = 'http://localhost:8000/api/residents';
  const [residents, setResidents] = useState([]);
  const [newResident, setNewResident] = useState({
    fullName: '',
    idPhoto: '',
    status: 'Kontrak',
    phone: '',
    isMarried: false
  });
  const [editResident, setEditResident] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      setResidents(response.data);
    } catch (error) {
      console.error("Error fetching residents", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResident({ ...newResident, [name]: value });
  };

  async function handleAddResident() {
    if (!newResident.fullName || !newResident.phone) {
      alert("Full Name and Phone Number are required");
      return;
    }
    try {
      const response = await axios.post(API_URL, newResident);
      setResidents([...residents, response.data]);
      setNewResident({ fullName: '', idPhoto: '', status: 'Kontrak', phone: '', isMarried: false });
    } catch (error) {
      console.error("Error adding resident", error);
    }
  }

  async function handleEditResident(resident) {
    setEditResident(resident);
    setNewResident(resident);
  }

  async function handleUpdateResident() {
    try {
      await axios.put(`${API_URL}/${editResident.id}`, newResident);
      setResidents(residents.map(res => res.id === editResident.id ? newResident : res));
      setNewResident({ fullName: '', idPhoto: '', status: 'Kontrak', phone: '', isMarried: false });
      setEditResident(null);
    } catch (error) {
      console.error("Error updating resident", error);
    }
  }

  async function handleDeleteResident(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setResidents(residents.filter(res => res.id !== id));
    } catch (error) {
      console.error("Error deleting resident", error);
    }
  }

  return (
    <div className="container my-5">
      <h2>Residents</h2>
      {loading ? <p>Loading...</p> : (
        <ul className="list-group mb-4">
          {residents.length > 0 ? residents.map((resident) => (
            <li key={resident.id} className="list-group-item">
              {resident.fullName} - {resident.status} - {resident.phone} - {resident.isMarried ? 'Married' : 'Single'}
              <button className="btn btn-info btn-sm float-end ms-2" onClick={() => handleEditResident(resident)}>Edit</button>
              <button className="btn btn-danger btn-sm float-end" onClick={() => handleDeleteResident(resident.id)}>Delete</button>
            </li>
          )) : <li className="list-group-item">No residents available</li>}
        </ul>
      )}
      <div className="input-group mb-3">
        <input type="text" className="form-control" placeholder="Full Name" name="fullName" value={newResident.fullName} onChange={handleInputChange} />
        <input type="text" className="form-control" placeholder="ID Photo URL" name="idPhoto" value={newResident.idPhoto} onChange={handleInputChange} />
        <input type="text" className="form-control" placeholder="Phone Number" name="phone" value={newResident.phone} onChange={handleInputChange} />
        <select className="form-control" name="status" value={newResident.status} onChange={handleInputChange}>
          <option value="Kontrak">Kontrak</option>
          <option value="Tetap">Tetap</option>
        </select>
        <div className="input-group-text">
          <input type="checkbox" checked={newResident.isMarried} onChange={() => setNewResident({ ...newResident, isMarried: !newResident.isMarried })} /> Married
        </div>
        <button className="btn btn-primary" onClick={editResident ? handleUpdateResident : handleAddResident}>
          {editResident ? 'Update Resident' : 'Add Resident'}
        </button>
      </div>
    </div>
  );
}

export default Residents;
