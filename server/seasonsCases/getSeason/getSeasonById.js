import { seasonRepository } from '../../repository/seasonsRepository.js';

const getSeason = async (req, res) => {
  const { id } = req.params;

  try {
    await seasonRepository.getSeason(id);
  } catch (error) {}
};
