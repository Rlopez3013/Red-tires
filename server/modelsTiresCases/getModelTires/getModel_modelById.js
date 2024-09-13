import { modelsTiresRepository } from '../../repository/modelsTiresRepository.js';

export const getModelTire = async (req, res) => {
  const { model_id } = req.params;

  try {
    await modelsTiresRepository.getModelTire(model_id);
  } catch (error) {}
};
