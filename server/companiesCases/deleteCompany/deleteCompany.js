import { companiesRepository } from '../../repository/companiesRepository';

const deleteCompany = async (req, res) => {
  const { id } = req.params;

  try {
    await companiesRepository.deleteCompany(id);
  } catch {}
};
