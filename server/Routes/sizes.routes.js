import { Router } from 'express';

import {
  getSizes,
  getSize,
  createSize,
  updateSize,
  deleteSize,
} from '../controllers/sizes.controller.js';

const router = Router();

router.get('/api/sizes', getSizes);
router.get('/api/sizes/:id', getSize);
router.post('/api/sizes', createSize);
router.put('/api/sizes/updateSizes:id', updateSize);
router.delete('/api/sizes/:id', deleteSize);

export default router;
