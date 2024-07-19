import { modelRepository } from '../../repository/modelRepository.js';

const getModel = async (req, res) => {
  const { id } = req.params;

  try {
    await modelRepository.getModel(id);
  } catch (error) {}
};
