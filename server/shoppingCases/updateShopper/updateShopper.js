import { shoppingCartRepository } from '../../repository/shoppingCartRepository.js';

export const updateShopper = async (req, res) => {
  const { id } = req.params;

  try {
    await shoppingCartRepository.updateShopper(id);
  } catch (error) {}
};
