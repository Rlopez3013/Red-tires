import { makerRepository } from '../../repository/makerRepository.js';

export const getAllMakers = async (req, res) => {
  await makerRepository.getAllMakers;
};
