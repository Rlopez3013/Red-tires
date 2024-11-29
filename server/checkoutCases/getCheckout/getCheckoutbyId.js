import { checkoutRepository } from '../repository/checkoutRepository.js';

export const getCheckout = async (req, res) => {
  const { checkout_id } = req.params;

  try {
    await checkoutRepository.getCheckout(checkout_id);
  } catch (error) {}
};
