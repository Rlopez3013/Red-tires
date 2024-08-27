import { modelRepository } from '../../repository/modelRepository.js';

export const getModelsByYear = async (req, res) => {
  const { year } = req.params;

  try {
    await modelRepository.getModelsByYear(year);
  } catch (error) {}
};
