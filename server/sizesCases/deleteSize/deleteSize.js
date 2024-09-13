import { sizesRepository } from '../../repository/sizesRepository.js';

const deleteSize = async (req, res) => {
  const { id } = req.params;

  try {
    await sizesRepository.deleteSize(id);
  } catch (error) {}
};
