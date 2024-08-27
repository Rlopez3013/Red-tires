import { modelRepository } from '../../repository/modelRepository.js';

export const getModels = async (req, res) => {
  await modelRepository.getModels;
};
