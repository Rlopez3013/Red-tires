import { shoppersRepository } from '../../repository/shopperRepository.js';

export const createShopper = async (req, res) => {
  try {
    await shoppersRepository.createShopper(req.body);
  } catch (error) {}
};
