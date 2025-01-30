import { cartRepository } from '../../repository/cartRepository.js';

export const createSession = async (req, res) => {
  try {
    await cartRepository.createSession(req.body);
  } catch (error) {}
};
