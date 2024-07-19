import { Router } from 'express';

import { getWheels, getWheel } from '../repository/wheelRepository.js';

const router = Router();

router.get('/api/wheels', getWheels);
router.get('/api/wheel/:id', getWheel);

export default router;
