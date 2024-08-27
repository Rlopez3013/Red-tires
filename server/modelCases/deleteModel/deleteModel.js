import { modelRepository } from '../../repository/modelRepository.js';

export const deleteModel = async (req, res) => {
  const { id } = req.params;

  try {
    await modelRepository.deleteModel(id);
  } catch (error) {}
};
