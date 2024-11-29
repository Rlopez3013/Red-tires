import { Router } from 'express';
import {
  getCustomerAddress,
  getCustomerAddresses,
} from '../repository/customerAddressRepository.js';

const router = Router();

router.get('/api/customeraddress', getCustomerAddresses);
router.get('/api/customeraddress/:customerId', getCustomerAddress);

export default router;
