import { join } from "path";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import UserModel from "../user/user.model";

const confirmationService = async (transactionId: string, ) => {
  const verifyResponse = await verifyPayment(transactionId);

  let result
  let message =""
  if (verifyResponse && verifyResponse.pay_status === "Successful") {
     // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
     result = await UserModel.findOneAndUpdate({transactionId}, {
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

export const paymentService = {
  confirmationService,
};
