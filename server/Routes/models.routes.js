import { Router } from 'express';
import {
  createModel,
  getModels,
  getModel,
  getModelsByYear,
  updateModel,
  deleteModel,
} from '../repository/modelRepository.js';

const router = Router();

router.get('/api/models/year/:year', getModelsByYear);

router.get('/api/models', getModels);
router.get('/api/models/:id', getModel);
router.post('/api/models', createModel);
router.put('/api/models/updateModel/:id', updateModel);
router.delete('/api/models/deleteModel/:id', deleteModel);

export default router;
