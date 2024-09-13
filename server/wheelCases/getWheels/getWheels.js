import { wheelRepository } from '../../repository/wheelRepository.js';

export const getWheels = async (req, res) => {
  await wheelRepository.getWheels;
};
