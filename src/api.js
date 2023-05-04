import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/';

export const getPeople = () => {
  return axios.get(`${API_BASE_URL}person/`);
};

export const createPerson = (data) => {
  return axios.post(`${API_BASE_URL}person/`, data);
};

export const updatePerson = (id, data) => {
  return axios.put(`${API_BASE_URL}person/${id}/`, data);
};

export const deletePerson = (id) => {
  return axios.delete(`${API_BASE_URL}person/${id}/`);
};

export const getPerson = (id) => {
  return axios.get(`${API_BASE_URL}person/${id}/`);
};
