import axios from 'axios';

const API_URL = 'http://localhost:8000/api/residents'; // Adjust the port if needed

export const getResidents = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createResident = async (residentData) => {
    const response = await axios.post(API_URL, residentData);
    return response.data;
};

export const updateResident = async (id, residentData) => {
    const response = await axios.put(`${API_URL}/${id}`, residentData);
    return response.data;
};

export const deleteResident = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
};
