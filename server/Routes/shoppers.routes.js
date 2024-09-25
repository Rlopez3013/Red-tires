import { Router } from 'express';

import {
  getShoppers,
  getShopper,
  createShopper,
  updateShopper,
  deleteShopper,
} from '../repository/shoppersRepository.js';

const router = Router();

router.get('/api/shoppers', getShoppers);
router.get('/api/shoppers/customer/:customer_id', getShopper);
router.post('/api/shoppers', createShopper);
router.put('/api/shoppers/:modelId/:tireId', updateShopper);
router.delete('/api/shopers', deleteShopper);

export default router;
