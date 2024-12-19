import { Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

import {
  createSession,
  // success,
  // cancel,
} from '../repository/paymentRepository.js';

const router = Router();

router.post('/api/create-checkout-session', createSession);
// router.get('/api/success', success);
// router.get('/api/cancel', cancel);

export default router;
