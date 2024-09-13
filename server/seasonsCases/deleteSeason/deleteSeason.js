import { seasonRepository } from '../../repository/seasonsRepository.js';

const deleteSeason = async (req, res) => {
  const { id } = req.params;

  try {
    await seasonRepository.deleteSeason(id);
  } catch (error) {}
};
