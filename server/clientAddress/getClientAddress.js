import { customerAddressRepository } from '../../repository/customerAddressRepository.js';

export const getCustomerAddress = async (req, res) => {
  await customerAddressRepository.getCustomerAddress;
};
