import { Router } from 'express';

import {
  createMaker,
  getAllMakers,
  deleteMaker,
  updateMaker,
} from '../repository/makerRepository.js';

const router = Router();

router.get('/api/makers', getAllMakers);
// router.get('/api/makers/:id', getMaker);
router.post('/api/makers', createMaker);
router.put('/api/makers/updateMaker/:id', updateMaker);
router.delete('/api/makers/delete/:id', deleteMaker);

export default router;
