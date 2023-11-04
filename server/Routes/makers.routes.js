import { Router } from 'express';
import {
  getMakers,
  createMaker,
  deleteMaker,
  updateMaker,
  getMaker,
} from '../controllers/makers.controllers.js';
const router = Router();

router.get('/api/makers', getMakers);
router.get('/api/makers/:id', getMaker);
router.post('/api/makers', createMaker);
router.put('/api/makers/updateMaker/:id', updateMaker);
router.delete('/api/makers/delete/:id', deleteMaker);

export default router;
