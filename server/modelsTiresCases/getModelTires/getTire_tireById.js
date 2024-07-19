import { modelsTiresRepository } from '../../repository/modelsTiresRepository.js';

export const getModelsTires = async (req, res) => {
  const { tire_id } = req.params;

  try {
    await modelsTiresRepository.getModelsTires(tire_id);
  } catch (error) {}
};
