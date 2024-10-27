import express from "express";
import { auth } from "../../middlewares/auth";
import { passwordMutationController } from "./passwordMutation.controller";



const passwordMutationRoute = express.Router();


passwordMutationRoute.patch('/change-password',auth('user', 'admin'), passwordMutationController.changePassword);
passwordMutationRoute.patch('/forgot-password', passwordMutationController.forgotPasswordReset);
passwordMutationRoute.patch('/reset-password', passwordMutationController.resetPassword);



export default passwordMutationRoute