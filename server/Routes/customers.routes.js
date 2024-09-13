import { Router } from 'express';
import {
  getCustomers,
  getCustomer,
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from '../repository/customerRepository.js';
const router = Router();

router.get('/api/customers', getCustomers);
router.get('/api/customers/:id', getCustomer);
router.post('/api/customers', createCustomer);
router.put('/api/customers/updateCustomer/:id', updateCustomer);
router.delete('/api/customers/deleteCustomer/:id', deleteCustomer);

export default router;
