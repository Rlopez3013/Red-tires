import { Router } from 'express';
import {
  getAddresess,
//   getCustomer,
//   createCustomer,
//   deleteCustomer,
//   updateCustomer,
} from '../repository/customerRepository.js';
const router = Router();

router.get('/api/addresses', getAddresess);
// router.get('/api/customers/:id', getCustomer);
// router.post('/api/customers', createCustomer);
// router.put('/api/customers/updateCustomer/:id', updateCustomer);
// router.delete('/api/customers/deleteCustomer/:id', deleteCustomer);

export default router;