import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import catchAsync from "../utils/catchAsync";
import config from "../config";


type Role = "admin" | "user";

export const auth = (...requiredRoles: Role[]) =>
  catchAsync((req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });

    const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    console.log('Decoded JWT:', decoded); // Log the decoded token to check
    if (requiredRoles && !requiredRoles.includes(decoded.role)) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: "You have no access to this route",
      });
    }

    req.user = decoded;
    next();
  });