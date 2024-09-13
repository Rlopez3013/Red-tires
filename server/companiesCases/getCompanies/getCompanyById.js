import { companiesRepository } from '../../repository/companiesRepository.js';

const getCompany = async (req, res) => {
  const { id } = req.params;

  try {
    await companiesRepository.getCompany(id);
  } catch (error) {}
};
