import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";
import httpStatus from "http-status";

export type TUserWithToken = TUser & {
    token: string;
  };


const createUser = catchAsync(async (req, res)=>{
 const result = await UserServices.createUserIntoDB(req.body)
 

 sendResponse(res, {
     success: true,
    statusCode:200,
    message: 'User registered successfully',
    data: {
        _id: result._id,
        name: result.name,
        email: result.email,
        image: result.image,
        role: result.role,
        bio: result.bio,
        premiumMembership: result.premiumMembership,
        followers:result.followers,
        following: result.following,
        isBlocked: result.isBlocked,
        transactionId: result.transactionId
      },
 })
})


 const loginUser = catchAsync(async (req, res) => {
    const result = await UserServices.getUserFromDB(req.body);
    res.json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token: result?.token,
      data: result?.result,
    });
  });


 const updateUser = catchAsync(async (req, res) => {
    const result = await UserServices.updateUserProfileIntoDb(req.params.id,  req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Profile updated successfully",
      data: result,
    });
  });

 const followUser = catchAsync(async (req, res) => {
    const result = await UserServices.addToFollowingIntoDb(req.params.id,  req.user);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Following is successfully",
      data: result,
    });
  });

 const removeFollowedUser = catchAsync(async (req, res) => {
    const result = await UserServices.removeFromFollowingIntoDb(req.params.id,  req.user);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Removed form following successfully",
      data: result,
    });
  });

 const getSingleUserWithPostedRecipe = catchAsync(async (req, res) => {
  const {id }=  req.params

    const result = await UserServices.getSingleUserWithPostedRecipeFromDb(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User retrieve with posted recipe successfully",
      data: result,
    });
  });


 const getUserPostedRecipe = catchAsync(async (req, res) => {

  const id = req.user.id
  
  const { searchTerm, minPrice, maxPrice, page = 1, limit = 10, sortBy, sortOrder } = req.query;
  const parsedLimit = Number(limit) || 10; 
  const parsedPage = Number(page) || 1; 
  const skip = (parsedPage - 1) * parsedLimit; 

  const priceFilter: Record<string, unknown> = {};
  if (minPrice) priceFilter.$gte = Number(minPrice);
  if (maxPrice) priceFilter.$lte = Number(maxPrice);

    const result = await UserServices.getUserPostedRecipeFromDb({
      id,
       searchTerm: searchTerm || "",
       priceFilter: Object.keys(priceFilter).length ? priceFilter : null,
       skip,
       limit:parsedLimit,
       sortBy,
       sortOrder
    }
      
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "UserS posted recipe retrieve successfully",
      data: result,
    });
  });

 const getSingleUser = catchAsync(async (req, res) => {
    const result = await UserServices.getSingleUserFromDb(req.params.id,);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User retrieve successfully",
      data: result,
    });
  });

 const getSingleUserWithEmail = catchAsync(async (req, res) => {
    const result = await UserServices.getSingleUserWithEmailFromDb(req.body.email,);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User retrieve by email successfully",
      data: result,
    });
  });

 const getAllUser = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUserFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All user retrieve successfully",
      data: result,
    });
  });


 const blockUser = catchAsync(async (req, res) => {
    const result = await UserServices.blockUserIntoDb(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User blocked successfully",
      data: result,
    });
  });

 const unblockUser = catchAsync(async (req, res) => {
    const result = await UserServices.unblockUserIntoDb(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User unblocked successfully",
      data: result,
    });
  });

 const deleteUser = catchAsync(async (req, res) => {
    const result = await UserServices.deleteUserFromDb(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User deleted successfully",
      data: result,
    });
  });

 const createAdmin = catchAsync(async (req, res) => {
    const result = await UserServices.createAdminIntoDb(req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Admin created successfully",
      data: result,
    });
  });


 const getAllAdmin = catchAsync(async (req, res) => {
    const result = await UserServices.getAllAdminFromDb();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "All admin retrieve successfully",
      data: result,
    });
  });
 const getSingleAdmin = catchAsync(async (req, res) => {
    const result = await UserServices.getSingleAdminFromDb(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Single admin retrieve successfully",
      data: result,
    });
  });

 const updateAdmin = catchAsync(async (req, res) => {
    const result = await UserServices.updateAdminProfileIntoDb(req.params.id, req.body);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Admin updated successfully",
      data: result,
    });
  });

 const deleteAdmin = catchAsync(async (req, res) => {
    const result = await UserServices.deleteAdminFromDb(req.params.id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Admin deleted successfully",
      data: result,
    });
  });




export const UserController = {
    createUser,
    loginUser,
    updateUser,
    followUser,
    removeFollowedUser,
    getSingleUserWithPostedRecipe,
    getUserPostedRecipe,
    getSingleUser,
    getSingleUserWithEmail,
    getAllUser,
    blockUser,
    unblockUser,
    deleteUser,
    createAdmin,
    getAllAdmin,
    getSingleAdmin,
    updateAdmin,
    deleteAdmin,
   







   
}