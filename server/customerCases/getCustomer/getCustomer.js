import { customerRepository } from '../../repository/customerRepository.js';

export const getCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await customerRepository.getCustomer(id);
  } catch (error) {}
};
