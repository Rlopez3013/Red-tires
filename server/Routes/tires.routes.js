import { Router } from 'express';

import {
  getTires,
  getTire,
  deleteTire,
  updateTire,
  createTire,
} from '../repository/tiresRepository.js';
const router = Router();

router.get('/api/tires', getTires);
router.get('/api/tires/:id', getTire);
router.post('/api/tires', createTire);
router.put('/api/tires/updateTire/:id', updateTire);
router.delete('/api/tires/deleteTire/:id', deleteTire);

export default router;
