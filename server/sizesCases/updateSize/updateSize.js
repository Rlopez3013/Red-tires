import { sizeRepository } from '../../repository/sizesRepository.js';

const updateSize = async (req, res) => {
  const { id } = req.params;

  try {
    await sizeRepository.updateSize(id);
  } catch (error) {}
};
