import { makerRepository } from '../../repository/makerRepository.js';

export const deleteMaker = async (req, res) => {
  const { id } = req.params;

  try {
    await makerRepository.deleteMaker(id);
  } catch (error) {}
};
