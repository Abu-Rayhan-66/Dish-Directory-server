import { Router } from 'express';
import { paymentController } from './payment.controller';




const router = Router();

router.post("/confirmation", paymentController.confirmationPaymentController)
router.patch("/make-payment/:id", paymentController.paymentInitialization)

export const paymentRoute =  router;
