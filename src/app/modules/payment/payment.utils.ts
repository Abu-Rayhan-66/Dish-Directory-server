import axios from "axios"
import dotenv from 'dotenv'
dotenv.config()


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const initiatePayment = async(paymentData: { id: any; totalPrice: any; userName: any; userEmail: any; transactionId?: any } )=>{
  try{
    const response = await  axios.post(process.env.PAYMENT_URL!, {
      store_id: process.env.STORE_ID,
      signature_key: process.env.SIGNATURE_KEY,
      tran_id: paymentData.id,
      success_url: `https://dish-directory.vercel.app/api/payment/confirmation?transactionId=${paymentData.id}&status=success`,
      fail_url: `https://dish-directory.vercel.app/api/payment/confirmation?status=failed`,
      cancel_url: "https://dish-directory-client.vercel.app",
      // success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.id}&status=success`,
      // fail_url: `http://localhost:5000/api/payment/confirmation?status=failed`,
      // cancel_url: "http://localhost:3000",
      amount: paymentData.totalPrice,
      currency: "BDT",
      desc: "Merchant Registration Payment",
      cus_name: paymentData.userName,
      cus_email: paymentData.userEmail,
      cus_add1: "N/A",
      cus_add2: "N/A",
      cus_city: "N/A",
      cus_state: "N/A",
      cus_postcode: "N/A",
      cus_country: "N/A",
      cus_phone: "N/A",
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