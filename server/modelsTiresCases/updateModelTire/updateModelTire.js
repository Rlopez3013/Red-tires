import { modelsTiresRepository } from '../../repository/modelsTiresRepository.js';

export const updateModelTire = async (req, res) => {
  const { modelId, tireId } = req.params;
  const { model_id, tire_id } = req.body;

  try {
    await modelsTiresRepository.updateModelTire(modelId, tireId),
      (model_id, tire_id);
  } catch (error) {}
};
