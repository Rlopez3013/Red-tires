import { modelRepository } from '../../repository/modelRepository';

export const createModel = async (req, res) => {
  try {
    await modelRepository.createModel(req.body);
  } catch (error) {}
};
