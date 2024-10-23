import { ordersRepository } from '../../repository/ordersRepository';

export const getOrders = async (req, res) => {
  await ordersRepository.getOrders;
};
