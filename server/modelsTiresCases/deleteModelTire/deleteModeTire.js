import { modelTiresRepository } from '../../repository/modelsTiresRepository.js';

export const deleteModelTires = async (req, res) => {
  const { model_id, tire_id } = req.body;

  try {
    await modelTiresRepository.deleteModelTires(model_id, tire_id);
  } catch (error) {}
};
