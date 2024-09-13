import { shoppingCartRepository } from '../../repository/shoppingCartRepository.js';

export const createShopper = async (req, res) => {
  try {
    await shoppingCartRepository.createShopper(req.body);
  } catch (error) {}
};
