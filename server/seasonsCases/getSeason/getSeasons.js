import { seasonRepository } from '../../repository/seasonsRepository.js';

export const getSeasons = async (req, res) => {
  await seasonRepository.getSeasons;
};
