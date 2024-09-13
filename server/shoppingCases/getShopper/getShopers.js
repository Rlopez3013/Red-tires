import { shoppingCartRepository } from '../../repository/shoppingCartRepository.js';

const getShoppers = async (req, res) => {
  await shoppingCartRepository.getShoppers;
};
