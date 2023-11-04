import { Router } from 'express';

import {
  getTires,
  getTire,
  deleteTire,
  updateTire,
  createTire,
} from '../controllers/tires.controller.js';
const router = Router();

router.get('/api/tires', getTires);
router.get('/api/tires/:id', getTire);
router.post('/api/tires', createTire);
router.put('/api/tires/updadteTire:id', updateTire);
router.delete('/api/tires/delete/:id', deleteTire);

export default router;
