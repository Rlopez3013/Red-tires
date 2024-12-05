
import {Router} from 'express'
import Stripe from 'stripe'
import dotenv from 'dotenv'

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


import {
    createPayment
} from '../repository/paymentRepository.js'

const router = Router()

router.post('/api/payments', createPayment)

export default router;