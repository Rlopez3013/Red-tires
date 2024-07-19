import { seasonsRepository } from '../../repository/seasonsRepository.js';

export const createSeason = async (req, res) => {
  try {
    await seasonsRepository.createSeason(req.body);
  } catch (error) {}
};
