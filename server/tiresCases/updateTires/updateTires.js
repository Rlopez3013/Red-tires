import { tiresRepository } from '../../repository/tiresRepository.js';

export const updateTire = async (req, res) => {
  const { id } = req.params;

  try {
    await tiresRepository.updateTire(id);
  } catch (error) {}
};
