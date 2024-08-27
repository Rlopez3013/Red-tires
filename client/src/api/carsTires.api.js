import axios from 'axios';
export const getCarsModelsRequest = async () =>
  await axios.get('http://localhost:4000/api/models_tires');
export const createCarsTiresRequest = async (models_tires) =>
  await axios.post('http://localhost:4000/api/models_tires', models_tires);
export const deleteCarsModelsRequest = async (id) =>
  await axios.delete(`http://localhost:4000/api/models_tires/${id}`);
export const getCarModelRequest = async (id) =>
  await axios.get(`http://localhost:4000/api/models_tires/${id}`);
export const updateCarModelRequest = async (id, newCarModel) =>
  await axios.put(`http://localhost:4000/api/models_tires/${id}`, newCarModel);
