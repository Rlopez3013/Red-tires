import { wheelsRepository } from '../../repository/wheelRepository.js';

export const getWheel = async (req, res) => {
  const { id } = req.params;

  try {
    await wheelsRepository.getWheel(id);
  } catch (error) {}
};
