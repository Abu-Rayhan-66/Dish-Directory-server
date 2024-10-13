import { Router } from 'express';
import { paymentController } from './payment.controller';




const router = Router();

router.post("/confirmation", paymentController.confirmationPaymentController)

export const paymentRoute =  router;
