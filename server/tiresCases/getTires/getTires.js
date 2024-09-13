import { tiresRepository } from '../../repository/tiresRepository.js';

export const getTires = async (req, res) => {
  await tiresRepository.getTires;
};
