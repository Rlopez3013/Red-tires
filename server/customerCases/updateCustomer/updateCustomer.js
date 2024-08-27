import { customerRepository } from '../../repository/customerRepository.js';

export const updateCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await customerRepository.updateCustomer(id);
  } catch (error) {}
};
