import { Router } from 'express';

import {
  getShoppers,
  getShopper,
  getClientes,
  createShopper,
  updateShopper,
  deleteShopper,
} from '../repository/shoppersRepository.js';

const router = Router();

router.get('/api/shoppers', getShoppers);
router.get('/api/shoppers/customer/:customerId', getShopper);
router.get('/api/shoppers/clientes', getClientes);
router.post('/api/shoppers', createShopper);
router.put('/api/shoppers/:modelId/:tireId', updateShopper);
router.delete('/api/shopers', deleteShopper);

export default router;
