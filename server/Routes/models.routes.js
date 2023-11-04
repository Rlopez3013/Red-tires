import { Router } from 'express';
import {
  getModels,
  createModel,
  getModelsByYear,
  deleteModel,
  updateModel,
  getModel,
} from '../controllers/models.controllers.js';
const router = Router();

router.get('/api/models/year/:year', getModelsByYear);

router.get('/api/models', getModels);
router.get('/api/models/:id', getModel);
router.post('/api/models', createModel);
router.put('/api/models/updateModel/:id', updateModel);
router.delete('/api/models/deleteModel/:id', deleteModel);

export default router;
