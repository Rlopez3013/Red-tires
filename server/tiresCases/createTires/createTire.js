import { tiresRepository } from '../../repository/tiresRepository.js';

export const createTire = async (req, res) => {
  try {
    await tiresRepository.createTire(req.body);
  } catch (error) {}
};
