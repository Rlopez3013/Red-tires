import { customerAddressRepository } from '../../repository/customerAddressRepository.js';

export const getCustomerAddresses = async (req, res) => {
  await customerAddressRepository.getCustomerAddresses;
};
