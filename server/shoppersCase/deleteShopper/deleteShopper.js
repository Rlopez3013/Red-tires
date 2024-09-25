import { shopperRepository } from '../../repository/shopperRepository.js';

export const deleteShopper = async (req, res) => {
  const { id } = req.params;

  try {
    await shopperRepository.deleteShopper(id);
  } catch (error) {}
};
