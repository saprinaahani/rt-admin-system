import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Houses = () => {
  const [houses, setHouses] = useState([]);
  const [newHouse, setNewHouse] = useState({
    address: '',
    status: 'Dihuni',
    residentId: ''
  });

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const response = await axios.get('/api/houses');
      setHouses(response.data);
    } catch (error) {
      console.error("Error fetching houses", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHouse({ ...newHouse, [name]: value });
  };

  const handleAddHouse = async () => {
    try {
      const response = await axios.post('/api/houses', newHouse);
      setHouses([...houses, response.data]);
      setNewHouse({ address: '', status: 'Dihuni', residentId: '' });
    } catch (error) {
      console.error("Error adding house", error);
    }
  };

  return (
    <div className="container my-5">
      <h2>Houses</h2>
      <ul className="list-group mb-4">
        {houses.map((house) => (
          <li key={house.id} className="list-group-item">
            {house.address} - {house.status} - Resident ID: {house.residentId}
          </li>
        ))}
      </ul>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Address"
          name="address"
          value={newHouse.address}
          onChange={handleInputChange}
        />
        <select
          className="form-control"
          name="status"
          value={newHouse.status}
          onChange={handleInputChange}
        >
          <option value="Dihuni">Dihuni</option>
          <option value="Kosong">Kosong</option>
        </select>
        <input
          type="text"
          className="form-control"
          placeholder="Resident ID"
          name="residentId"
          value={newHouse.residentId}
          onChange={handleInputChange}
        />
        <button className="btn btn-primary" onClick={handleAddHouse}>Add House</button>
      </div>
    </div>
  );
};

export default Houses;
