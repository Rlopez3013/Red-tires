import { makerRepository } from '../../repository/makerRepository.js';

export const createMaker = async (req, res) => {
  try {
    await makerRepository.createMaker(req.body);
  } catch (error) {}
};
