import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import UserModel from "../user/user.model";
import bcrypt from "bcrypt";
import { createToken } from "../../utils/createToken";
import { sendEmail } from "../../utils/sendEmail/sendEmail";
import jwt, { JwtPayload } from 'jsonwebtoken';


const changePassword = async (payload: {
  email: string;
  password: string;
  newPassword: string;
}) => {
  const user = await UserModel.findOne({ email: payload.email });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND,'User not found.');
  }

  const matchPassword = await bcrypt.compare(payload.password, user.password);

  if (!matchPassword) {
    throw new AppError(httpStatus.UNAUTHORIZED,'You have entered the wrong current password!');
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await UserModel.findOneAndUpdate(
    {
      email: payload.email,
    },
    {
      password: newHashedPassword,
    },
  );
};
  
  const forgotPassword = async (email: string) => {
    const user = await UserModel.findOne({ email: email });
  
    if (!user) {
      throw new Error('You are not a registered user yet!');
    }
  
    const jwtPayload = {
      email: user?.email,
      role: user?.role,
    };
  
    const resetToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      '10m',
    );
  
    const resetUILink = `${config.reset_pass_ui_link}/reset-password?email=${user?.email}&token=${resetToken} `;
  
    await sendEmail(user?.email as string, resetUILink);
  };




  const resetPasswordIntoDb = async (payload:{email:string, newPassword:string}, token:string) => {

    const actualToken = token.split(" ")[1]

    if(!payload.newPassword){
      throw new AppError(httpStatus.NOT_FOUND, "new password is missing")
    }

    if(token === 'undefine'){
      throw new AppError(httpStatus.NOT_FOUND, "Token is not found")
    }
  
    const user = await UserModel.findOne({email:payload.email});

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }

    const isBlocked = user?.isBlocked === true

  if (isBlocked) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked');
  }

    const decoded = jwt.verify(
      actualToken,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    if (payload.email !== decoded.email) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!');
    }

   
  const newHashedPassword = await bcrypt.hash(  
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );


  await UserModel.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  );
  

  };
  
  export const passwordMutationServices = {
    changePassword,
    forgotPassword,
    resetPasswordIntoDb
  };