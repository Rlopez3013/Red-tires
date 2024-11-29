import { Router } from 'express';

import {
  createCheckout,
  getAllCheckouts,
  getCheckout,
  updateCheckout,
  deleteCheckout,
} from '../repository/checkoutRepository.js';

const router = Router();

router.get('/api/checkouts', getAllCheckouts);
router.get('/api/checkouts/:checkout_id', getCheckout);
router.post('/api/checkouts', createCheckout);
router.put('/api/checkouts/updateCheckout/:checkout_id', updateCheckout);
router.delete('/api/checkouts/delete/:checkout_id', deleteCheckout);

export default router;
