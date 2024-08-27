import { companiesRepository } from '../../repository/companiesRepository.js';

export const createCompany = async (req, res) => {
  try {
    await companiesRepository.createCompany(req.body);
  } catch (error) {}
};
