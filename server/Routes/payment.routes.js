import { Router } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const BKND_URL = process.env.BKND_URL;

import {
  createSession,
  // success,
  // cancel,
} from '../repository/paymentRepository.js';

const router = Router();

router.post('/create-checkout-session', createSession);
// router.get(`${BKND_URL}/api/success`,success, (req, res) => res.send('Success! Payment was successful.'));
// router.get(`${BKND_URL}/api/cancel`,cancel, (req, res) => res.send('Payment was canceled.'));

export default router;
