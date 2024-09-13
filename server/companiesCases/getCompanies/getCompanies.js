import { companiesRepository } from '../../repository/companiesRepository.js';

export const getCompanies = async (req, res) => {
  await companiesRepository.getCompanies;
};
