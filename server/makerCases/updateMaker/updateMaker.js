import { makerRepository } from '../../repository/makerRepository.js';

export const updateMaker = async (req, res) => {
  const { id } = req.params;

  try {
    await makerRepository.updateMaker(id);
  } catch (error) {}
};
