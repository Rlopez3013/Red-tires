import { orderRepository } from '../../repository/ordersRepository';

export const getOrder = async (req, res) => {
  const { order_id } = req.params;

  try {
    await orderRepository.getOrder(order_id);
  } catch (error) {}
};
