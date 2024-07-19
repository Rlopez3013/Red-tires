import { tiresRepository } from '../../repository/tiresRepository.js';

const getTire = async (req, res) => {
  const { id } = req.params;

  try {
    await tiresRepository.getTire(id);
  } catch (error) {}
};
