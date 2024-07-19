import { Router } from 'express';
import { deleteModel } from '../controllers/models.controllers.js';

import {
  getModelsTires,
  createModelTire,
  updateModelTire,
  getModelTire,
  deleteModelTires,
  getModelTiremodel,
  getModelTirestires,
} from '../repository/modelsTiresRepository.js';

const router = Router();

router.get('/api/models_tires', getModelsTires);

router.get('/api/models_tires/model/:model_id', getModelTiremodel);
router.get('/api/models_tires/tire/:tire_Id', getModelTirestires);

router.get('/api/models_tires/:model/:tire', getModelTire);

router.post('/api/models_tires', createModelTire);
router.put('/api/models_tires/:modelId/:tireId', updateModelTire);
router.delete('/api/models_tires', deleteModelTires);

export default router;
