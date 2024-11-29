import { Router } from 'express';

import { getOrder, getOrders } from '../repository/ordersRepository.js';

const router = Router();

router.get('/api/orders', getOrders);
router.get('/api/orders/:order_id', getOrder);


export default router;
