import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { passwordMutationServices } from "./passwordMutation.service";

const changePassword = catchAsync(async (req, res, ) => {
    
      const result = await passwordMutationServices.changePassword(req.body);

      
  
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Password changed successfully",
        data: result,
      })
    
      
    })
 
  
  const forgotPasswordReset  = catchAsync( async (req, res) => {
   
      const email = req.body.email;
      const result = await passwordMutationServices.forgotPassword(email);
  
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Reset link is generated successfully",
        data: result,
      })
    
  })

  const resetPassword = catchAsync( async (req, res) => {

    const token = req.headers.authorization
   
      const data = req.body
      const result = await passwordMutationServices.resetPasswordIntoDb(data, token as string);
  
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Password is reset successfully",
        data: result,
      })
    
  })

  export const  passwordMutationController = {
   changePassword,
   forgotPasswordReset,
   resetPassword,
  }