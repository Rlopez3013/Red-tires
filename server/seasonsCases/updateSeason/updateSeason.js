import { seasonsRepository } from '../../repository/seasonsRepository.js';

const updateSeason = async (req, res) => {
  const { id } = req.params;

  try {
    await seasonsRepository.updateSeason(id);
  } catch (errror) {}
};
