import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()


export const initiatePayment = async(paymentData: { transactionId: unknown; totalPrice: unknown; userName?: string; userEmail?: string; userAddress?: string; userNumber?: string })=>{
  try{
    const response = await  axios.post(process.env.PAYMENT_URL!, {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      tran_id: paymentData.transactionId,
      success_url: `https://assignment-3-ten-chi.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
      fail_url: `https://assignment-3-ten-chi.vercel.app/api/payment/confirmation?status=failed`,
      cancel_url: "https://sport-facility.netlify.app/facility",
      amount: paymentData.totalPrice,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.userName,
      cus_email: paymentData.userEmail,
      cus_add1: paymentData.userAddress,
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: paymentData.userNumber,
      type: "json"
    })
    return response.data
  }catch(err){
    throw new Error("Payment initiation failed")
  }
  
}

export const verifyPayment = async(tnxId:string)=>{
  try{
    const response = await axios.get(process.env.PAYMENT_VERIFY_URL!,{
      params:{
        store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      type:"json",
      request_id:tnxId
      }
    })
    return response.data
  }catch(err){
    throw new Error("Payment verification failed")
  }
}