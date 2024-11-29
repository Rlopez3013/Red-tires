import {Router} from 'express'

import {
    createPayment
} from '../repository/paymentRepository.js'

const router = Router()

router.post('/api/payments', createPayment)

export default router;