import { Router } from 'express';
import { create, eliminare } from '../makerCases/makerController.js';

// const { createMk } = create;

import {
  getMakers,
  getMaker,
  //createMaker,
  updateMaker,
  //deleteMaker,
} from '../controllers/makers.controllers.js';

const router = Router();

router.get('/api/makers', getMakers);
// router.get('/api/makers/:id', getMaker);
router.post('/api/makers', create);
// router.put('/api/makers/updateMaker/:id', updateMaker);
router.delete('/api/makers/delete/:id', eliminare);

export default router;
