import { join } from "path";
import { initiatePayment, verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import UserModel from "../user/user.model";


const confirmationService = async (id: string, ) => {
  const verifyResponse = await verifyPayment(id);

  let result
  let message =""
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
     // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
     result = await UserModel.findOneAndUpdate({transactionId: id}, {
     premiumMembership: true,
    });
    message = "Successfully paid"
  }else{
    message = " Failed"
  }
  const filePath = join(__dirname, '../../../../public/payment.html')
  let template = readFileSync(filePath, "utf-8")
  template = template.replace(/{{message}}/g, message)
  return template;
};


const paymentInitializationProcess =  async(payload: string)=>{


  const userInfo = await UserModel.findById(payload)
  if (!userInfo) {
    throw new Error("User not found");
  }

  const payableAmount = 20
  const transactionId = `TXN-${Date.now()}`;

  await UserModel.findByIdAndUpdate(payload, {transactionId:transactionId})

  const totalPrice =payableAmount
  const id = transactionId

  const userName = userInfo!.name
  const userEmail = userInfo!.email


  const paymentData = {
    id,
    totalPrice,
    userName, 
    userEmail,

  }
  const paymentInfo = await initiatePayment(paymentData)
  return {
    paymentInfo,
    
  }
}

export const paymentService = {
  confirmationService,
  paymentInitializationProcess
};
