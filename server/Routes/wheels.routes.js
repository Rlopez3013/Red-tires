import { Router } from 'express';

import { getWheels } from '../controllers/wheels.controllers.js';

const router = Router();

router.get('/api/wheels', getWheels);

export default router;
