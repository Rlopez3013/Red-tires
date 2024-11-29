import { checkoutRepository } from '../repository/checkoutRepository.js';

export const getCheckouts = async (req, res) => {
  await checkoutRepository.getCheckout;
};
