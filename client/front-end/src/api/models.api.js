import axios from 'axios';

export const getModelsRequest = async () =>
  await axios.get('http://localhost:4000/api/models');

export const createModelRequest = async (model) =>
  await axios.post('http://localhost:4000/api/models', model);

export const deleteModelRequest = async (id) =>
  await axios.delete(`http://localhost:4000/api/models/${id}`);

export const getModelRequest = async (id) =>
  await axios.get(`http://localhost:4000/api/models/${id}`);

// export const updateModelRequest = async (id, newModels) =>
//   await axios.put(`http://localhost:4000/api/models/${id}`, newModels);
