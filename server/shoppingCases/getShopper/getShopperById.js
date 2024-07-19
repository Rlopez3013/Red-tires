import { shoppingCartRepository } from '../../repository/shoppingCartRepository.js';

const getShopper = async (req, res) => {
  const { id } = req.params;

  try {
    await shoppingCartRepository.getShopper(id);
  } catch (error) {}
};
