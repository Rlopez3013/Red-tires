import axios from 'axios';

export const getMakersRequest = async () =>
  await axios.get('http://localhost:4000/api/makers');

export const crearMakerRequest = async (maker) =>
  await axios.post('http://localhost:4000/api/makers', maker);

export const deleteMakerRequest = async (id) =>
  await axios.delete(`http://localhost:4000/api/makers/delete/${id}`);

export const getMakerRequest = async (id) =>
  await axios.get(`http://localhost:4000/api/makers/${id}`);

export const updateMakerRequest = async (id, newMakers) =>
  await axios.put(`http://localhost:4000/api/makers/edit/${id}`, newMakers);
