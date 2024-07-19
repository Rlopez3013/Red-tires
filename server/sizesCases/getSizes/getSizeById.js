import { sizeRepository } from '../../repository/sizesRepository.js';

const getSize = async (req, res) => {
  const { id } = req.params;

  try {
    await sizeRepository.getSize(id);
  } catch (error) {}
};
