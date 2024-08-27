import { tiresRepository } from '../../repository/tiresRepository.js';

export const deleteTire = async (req, res) => {
  const { id } = req.params;

  try {
    await tiresRepository.deleteTire(id);
  } catch (error) {}
};
