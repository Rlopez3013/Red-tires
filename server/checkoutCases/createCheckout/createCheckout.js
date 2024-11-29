import { checkoutRepository } from '../../repository/checkoutRepository.js';

export const createCheckout = async (req, res) => {
  try {
    await checkoutRepository.createCheckout(req.body);
  } catch (error) {}
};
