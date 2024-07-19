import { Router } from 'express';
import {
  getShoppers,
  getShopper,
  updateShopper,
  deleteShopper,
  createShopper,
} from '../repository/shoppingCartRepository.js';
const router = Router();

router.get('/api/shops', getShoppers);
router.get('/api/shop/:id', getShopper);
router.post('/api/shop', createShopper);
router.put('/api/updateShop', updateShopper);
router.delete('/api/deleteShop', deleteShopper);

export default router;
