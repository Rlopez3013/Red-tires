import { shopperRepository } from '../../repository/shopperRepository.js';

export const updateShopper = async (req, res) => {
  const { model_id, tire_id, custormer_id } = req.body;

  try {
    await shopperRepository.updateShopper(model_id, tire_id, custormer_id);
  } catch (error) {}
};
