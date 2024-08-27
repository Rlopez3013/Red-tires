import { customerRepository } from '../../repository/customerRepository.js';

export const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    await customerRepository.deleteCustomer(id);
  } catch (error) {}
};
