import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

export const fetchPeopleData = async (keyword = '', location = '', affiliation = '') => {
  const response = await axios.get(`${API_BASE_URL}/people?keyword=${keyword}&location=${location}&affiliation=${affiliation}`);
  return response.data;
};

export const uploadFile = async (formData: FormData) => {
  const response = await axios.post(`${API_BASE_URL}/import`, formData);
  return response.data;
};

export const fetchLocationData = async (keyword = '') => {
  const response = await axios.get(`${API_BASE_URL}/locations`);
  return response.data;
};

export const fetchAffiliationData = async () => {
  const response = await axios.get(`${API_BASE_URL}/affiliations`);
  return response.data;
};