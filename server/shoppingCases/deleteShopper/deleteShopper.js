import { shoppingCartRepository } from '../../repository/shoppingCartRepository.js';

export const deleteShopper = async (req, res) => {
  const { id } = req.params;

  try {
    await shoppingCartRepository.deleteShopper(id);
  } catch (error) {}
};
