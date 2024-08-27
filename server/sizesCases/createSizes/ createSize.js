import { sizesRepository } from '../../repository/sizesRepository.js';

export const createSize = async (req, res) => {
  try {
    await sizesRepository.createSize(req.body);
  } catch (error) {}
};
