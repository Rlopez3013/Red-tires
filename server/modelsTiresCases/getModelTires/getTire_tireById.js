import { modelsTiresRepository } from '../../repository/modelsTiresRepository.js';

export const getModelsTires = async (req, res) => {
  const { tire_name, tire_id } = req.params;
  console.log(req.params.tire_name);
  try {
    await modelsTiresRepository.getModelsTires(tire_name, tire_id);
  } catch (error) {}
};
