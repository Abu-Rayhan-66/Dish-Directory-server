import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { recipeService } from "./recipe.service";


const createRecipe = catchAsync(async (req, res ) => {

  const newRecipe = await recipeService.createRecipeIntoDb(req.body, req.user);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Recipe created successfully",
    data: newRecipe,
  });
});

const upVoteRecipe = catchAsync(async (req, res) =>{
  const upVote = await recipeService.upVoteRecipeIntoDb(
    req.params.recipeId,
    req.user,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Up vote added successfully",
    data: upVote,
  })
})


const downVoteRecipe = catchAsync(async (req, res) =>{
  const downVote = await recipeService.downVoteRecipeIntoDb(
    req.params.recipeId,
    req.user,
  )
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Down vote added successfully",
    data: downVote,
  })
})


const rateRecipe = catchAsync(async(req,res) =>{
  const rating = await recipeService.rateRecipeIntoDb(
    req.params.recipeId,
    req.user,
    req.body.rating,
  );

 
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Rating added successfully",
    data: rating,
  })

})


const addComment = catchAsync(async(req, res) =>{
  const comment = await recipeService.commentRecipeIntoDb(
    req.params.recipeId,
    req.user,
    req.body,
  );


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "comment added successfully",
    data: comment,
  })


})

const editRecipeComment = catchAsync(async(req, res) =>{
  const editComment = await recipeService.editRecipeCommentIntoDb(
    req.params.recipeId,
    req.params.commentId,
    req.body.comment,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "comment edited successfully",
    data: editComment,
  })
})


const deleteComment = catchAsync(async(req, res) =>{
  const deleteComment = await recipeService.deleteCommentFromDb( req.params.recipeId, req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "comment deleted successfully",
    data: deleteComment,
  })
})



const getAllRecipes = catchAsync(async(req, res) =>{

  const { searchTerm, minPrice, maxPrice,  sortBy, sortOrder, id} = req.query;
 
  const priceFilter: Record<string, unknown> = {};
  if (minPrice) priceFilter.$gte = Number(minPrice);
  if (maxPrice) priceFilter.$lte = Number(maxPrice);
  
  const result = await recipeService.getAllRecipesFromDb({
       userId: id,
       searchTerm: searchTerm || "",
       priceFilter: Object.keys(priceFilter).length ? priceFilter : null,
       sortBy,
       sortOrder
  })

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Recipes retrieve successfully",
    data: result,
  })

})

const getAllRecipesForAdmin = catchAsync(async(req, res) =>{
  const result = await recipeService.getAllRecipesForAdminFromDb()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: " Recipes for admin retrieve successfully",
    data: result,
  })

})

const getSingleRecipe = catchAsync(async(req, res) =>{
  const result = await recipeService.getSingleRecipeFromDb(req.params.recipeId)


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Single recipe retrieve successfully",
    data: result,
  });

})

const deleteRecipe = catchAsync(async(req, res) =>{
  const result = await recipeService.deleteRecipeIntoDb(req.params.recipeId)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Recipe deleted successfully",
    data: result,
  })

})

const updateRecipe = catchAsync(async(req, res) =>{
  const result = await recipeService.updateRecipeIntoDb(req.body, req.params.recipeId)


  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Recipe updated successfully",
    data: result,
  })

})

const publishRecipe = catchAsync(async(req, res) =>{
  const result = await recipeService.publishRecipeIntoDb(req.params.recipeId)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Recipe published successfully",
    data: result,
  })

})

const unPublishRecipe = catchAsync(async(req, res) =>{
  const result = await recipeService.unpublishRecipeIntoDb(req.params.recipeId)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Recipe unpublished successfully",
    data: result,
  })

})


export const recipeController = {
  createRecipe,
  upVoteRecipe,
  downVoteRecipe,
  rateRecipe,
  addComment,
  editRecipeComment,
  deleteComment,
  getAllRecipes,
  getAllRecipesForAdmin,
  getSingleRecipe,
  deleteRecipe,
  publishRecipe,
  unPublishRecipe,
  updateRecipe

};