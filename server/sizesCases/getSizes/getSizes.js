import { sizesRepository } from '../../repository/sizesRepository.js';

export const getSizes = async (req, res) => {
  await sizesRepository.getSizes;
};
