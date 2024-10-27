import { Request, Response } from "express";
import { paymentService } from "./payment.service";


const confirmationPaymentController = async(req:Request,res:Response)=>{
 const {transactionId} = req.query
    const result = await paymentService.confirmationService(transactionId as string )
res.send(result)
   
  }

 const paymentInitialization = async(req:Request, res:Response)=>{

  const {id} = req.params
  const result = await paymentService.paymentInitializationProcess(id)

  res.send(result)

 } 

 export const  paymentController = {
   confirmationPaymentController,
   paymentInitialization
 }