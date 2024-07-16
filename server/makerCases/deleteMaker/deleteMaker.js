import { makerRepository } from '../../repository/makerRepository.js';

const deleteMaker = async (req, res) => {
  const { id } = req.params;

  try {
    await makerRepository.deleteMaker(id);
  } catch (error) {}
};
