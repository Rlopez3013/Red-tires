import { Router } from 'express';

import {
  getCompanies,
  createCompany,
  deleteCompany,
  updateCompany,
  getCompany,
} from '../controllers/companies.controller.js';

const router = Router();

router.get('/api/companies', getCompanies);
router.get('/api/companies/:id', getCompany);
router.post('/api/companies/', createCompany);
router.put('/api/companies/:id', updateCompany);
router.delete('/api/companies/:id', deleteCompany);

export default router; 
