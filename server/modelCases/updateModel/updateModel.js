import { modelRepository } from '../../repository/modelRepository.js';

export const updateModel = async (req, res) => {
  const { id } = req.params;

  try {
    await modelRepository.updateModel(id);
  } catch (error) {}
};
