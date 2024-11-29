import { checkoutRepository } from '../../repository/checkoutRepository.js';

export const updateCheckout = async (req, res) => {
  const { checkout_id } = req.params;

  try {
    await checkoutRepository.updateCheckout(checkout_id);
  } catch (error) {}
};
