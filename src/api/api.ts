import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const fetchPeopleData = async () => {
  const response = await axios.get(`${API_BASE_URL}/people`);
  return response.data;
};

export const uploadFile = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/import`, formData);
  return response.data;
};