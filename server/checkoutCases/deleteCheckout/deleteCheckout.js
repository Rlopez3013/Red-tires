import { checkoutRepository } from '../../repository/checkoutRepository.js';

export const deleteCheckout = async (req, res) => {
  const { checkout_id } = req.params;

  try {
    await checkoutRepository.deleteCheckout(checkout_id);
  } catch (error) {}
};
