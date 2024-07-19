import { modelsTiresRepository } from '../../repository/modelsTiresRepository.js';

export const createModelTire = async (req, res) => {
  try {
    await modelsTiresRepository.createModelTire(req.body);
  } catch (error) {}
};
