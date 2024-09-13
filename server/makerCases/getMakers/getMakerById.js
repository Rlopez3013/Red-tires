import { makerRepository } from '../../repository/makerRepository.js';

const getMaker = async (req, res) => {
  const { id } = req.params;

  try {
    await makerRepository.getMaker(id);
  } catch (error) {}
};
