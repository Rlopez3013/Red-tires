import { modelsTiresRepository } from '../../repository/companiesRepository.js';

export const getModelsTires = async (req, res) => {
  await modelsTiresRepository.getModelsTires;
};
