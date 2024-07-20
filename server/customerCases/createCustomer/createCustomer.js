import { customerRepository } from '../../repository/customerRepository.js';

export const createCustomer = async (req, res) => {
  try {
    await customerRepository.createCustomer(req.body);
  } catch (error) {}
};
