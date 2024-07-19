import { customerRepository } from '../../repository/customerRepository.js';

export const getCustomers = async (req, res) => {
  try {
    await customerRepository.getCustomers;
  } catch (error) {}
};
