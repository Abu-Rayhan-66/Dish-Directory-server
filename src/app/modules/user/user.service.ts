import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { JwtPayload } from "jsonwebtoken";
import { createToken } from "../../utils/createToken";
import config from "../../config";
import UserModel from "./user.model";
import RecipeModel from "../recipe/recipe.model";



const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const getUserFromDB = async (data: { email: string; password: string }) => {
  if (!data || !data.email || !data.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required"
    );
  }

  const user = await UserModel.findOne({ email: data.email! })
    .select("+password")
    .lean();

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const match = await bcrypt.compare(data.password, user.password);

  if (!match) {
    throw new AppError(httpStatus.NOT_FOUND, "Incorrect password");
  }

  const jwtPayload: JwtPayload = {
    id: user._id,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_access_expire_in!
  );

  const result = await UserModel.findById(user._id);

  return { token, result };
};


const updateUserProfileIntoDb = async (userId: string, updateData: Partial<TUser>) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found!');
  }

  // If email is being updated, ensure it's unique
  if (updateData.email) {
    const existingUser = await UserModel.findOne({ email: updateData.email });
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new Error('Email already in use!');
    }
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
    new: true,
  });

  return updatedUser;
};


const addToFollowingIntoDb = async (id: string, user: JwtPayload) => {
  const currentUser = await UserModel.findById(user.id);


  if (!currentUser) {
    throw new Error('Current user not found!');
  }
  // Check if the user is already following the target user
  if (currentUser.following.includes(id)) {
    throw new Error('You are already following this user.');
  }

  // Push the new user to the 'following' array using $addToSet to prevent duplicates
  const updatedUser = await UserModel.findByIdAndUpdate(
    user.id,
    {
      $addToSet: { following: id },
    },
    { new: true }, // Return the updated document
  );

  if (!updatedUser) {
    throw new Error('Failed to update following list.');
  }

  // Also add the current user to the 'followers' field of the target user
  await UserModel.findByIdAndUpdate(id, {
    $addToSet: { followers: user.id },
  });

  return updatedUser;
};

const removeFromFollowingIntoDb = async (id: string, user: JwtPayload) => {
  const currentUser = await UserModel.findById(user.id);

  if (!currentUser) {
    throw new Error('Current user not found!');
  }

  // Check if the user is following the target user
  if (!currentUser.following.includes(id)) {
    throw new Error('You are not following this user.');
  }

  // Remove the target user from the 'following' array of the current user
  const updatedUser = await UserModel.findByIdAndUpdate(
    user.id,
    {
      $pull: { following: id },
    },
    { new: true }, // Return the updated document
  );

  if (!updatedUser) {
    throw new Error('Failed to update following list.');
  }

  // Also remove the current user from the 'followers' field of the target user
  await UserModel.findByIdAndUpdate(id, {
    $pull: { followers: user.id },
  });

  return updatedUser;
};



const getSingleUserWithPostedRecipeFromDb = async (id: string) => {
  const userData = await UserModel.findById(id);
  const userPostedRecipeData = await RecipeModel.find({ user: id });

  return { userData, userPostedRecipeData };
};


const getSingleUserFromDb = async (id: string) => {
  const userData = await UserModel.findById(id);

  return userData;
};

const getAllUserFromDb = async () => {
  const userData = await UserModel.find({ role: 'user' });
  return userData;
};


const blockUserIntoDb = async (id: string) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { isBlocked: true },
    { new: true },
  );

  return user;
};

const unblockUserIntoDb = async (id: string) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    { isBlocked: false },
    { new: true },
  );

  return user;
};

const deleteUserFromDb = async (id: string) => {
  await RecipeModel.deleteMany({ user: id });

  const user = await UserModel.findByIdAndDelete(id);

  return user;
};

const createAdminIntoDb = async (payload: TUser) => {
  const isUserAlreadyExists = await UserModel.findOne({ email: payload.email });

  if (isUserAlreadyExists) {
    throw new Error('Admin already exists!');
  }

  payload.role = 'admin';

  const result = await UserModel.create(payload);

  return result;
};

const getAllAdminFromDb = async () => {
  const result = await UserModel.find({ role: 'admin' });

  return result;
};


const updateAdminProfileIntoDb = async (
  userId: string,
  updateData: Partial<TUser>,
) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error('User not found!');
  }

  // If email is being updated, ensure it's unique
  if (updateData.email) {
    const existingUser = await UserModel.findOne({ email: updateData.email });
    if (existingUser && existingUser._id.toString() !== userId) {
      throw new Error('Email already in use!');
    }
  }

  const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
    new: true,
  });

  return updatedUser;
};

const deleteAdminFromDb = async (id: string) => {
  const user = await UserModel.findByIdAndDelete(id);

  return user;
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
  updateUserProfileIntoDb,
  addToFollowingIntoDb,
  removeFromFollowingIntoDb,
  getSingleUserWithPostedRecipeFromDb,
  getSingleUserFromDb,

  getAllUserFromDb,
  blockUserIntoDb,
  unblockUserIntoDb,
  deleteUserFromDb,
  createAdminIntoDb,
  getAllAdminFromDb,
  updateAdminProfileIntoDb,
  deleteAdminFromDb


};
