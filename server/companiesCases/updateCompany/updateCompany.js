import { companiesRepository } from '../../repository/companiesRepository.js';

export const updateCompany = async (req, res) => {
  const { id } = req.params;
  try {
    await companiesRepository.updateCompany(id);
  } catch (error) {}
};
