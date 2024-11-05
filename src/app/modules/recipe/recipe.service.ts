/* eslint-disable @typescript-eslint/no-explicit-any */
import { TRecipe } from "./recipe.interface";
import RecipeModel from "./recipe.model";
import { JwtPayload } from "jsonwebtoken";
import UserModel from "../user/user.model";



const createRecipeIntoDb = async (payload: TRecipe, user:JwtPayload) => {


    const userRecord = await UserModel.findById(user.id);


    if (!userRecord) {
        throw new Error('User not found');
      }
    
      if (userRecord.isBlocked) {
        throw new Error('Your account has been blocked!');
      }
    
      payload.user = user.id;
    
      if (payload.isPremium) {
        payload.isPremium = true;
      }

  return await RecipeModel.create(payload);
};

const upVoteRecipeIntoDb = async (recipeId:string, user:JwtPayload) =>{
  const recipe = await RecipeModel.findById(recipeId);


  if (!recipe) {
    throw new Error('Recipe not found');
  }

  if (recipe.upvote.includes(user.id)) {
    throw new Error('You have already up voted this recipe');
  }

  if (recipe.downvote.includes(user.id)) {
    await RecipeModel.findByIdAndUpdate(
      recipeId,
      {
        $pull: { downvote: user.id },
      },
      { new: true },
    );
}

await RecipeModel.findByIdAndUpdate(
  recipeId,
  {
    $push: { upvote: user.id }, 
  },
  { new: true }, 
);

}

const downVoteRecipeIntoDb = async (recipeId:string, user:JwtPayload) =>{
  const recipe = await RecipeModel.findById(recipeId);


  if (!recipe) {
    throw new Error('Recipe not found');
  }

  if (recipe.downvote.includes(user.id)) {
    throw new Error('You have already down voted this recipe');
  }

  if (recipe.upvote.includes(user.id)) {
    await RecipeModel.findByIdAndUpdate(
      recipeId,
      {
        $pull: { upvote: user.id },
      },
      { new: true },
    );
}

await RecipeModel.findByIdAndUpdate(
  recipeId,
  {
    $push: { downvote: user.id }, 
  },
  { new: true }, 
);

}

const rateRecipeIntoDb = async (
  recipeId: string,
  user: JwtPayload,
  newRating: number,
) => {

  const recipe = await RecipeModel.findById(recipeId);

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  const existingRatingIndex = recipe.rating.findIndex(
    (r) => r.id === user.id,
  );

  if (existingRatingIndex !== -1) {
    recipe.rating[existingRatingIndex].rating = newRating;
  } else {
    recipe.rating.push({ id: user.id, rating: newRating });
  }



  const updatedRecipe = await recipe.save();

  return updatedRecipe;
};


const commentRecipeIntoDb = async (
  recipeId: string,
  user: JwtPayload,
  data: {name:string, image:string, comment:string},
) => {

  const recipe = await RecipeModel.findById(recipeId);

  if (!recipe) {
    throw new Error('Recipe not found');
  }

  recipe.comments.push({
    id: user.id,
    name: data.name,
    profilePicture: data.image,
    comment: data.comment,
  });

  const updatedRecipe = await recipe.save();
  return updatedRecipe;
};


const editRecipeCommentIntoDb = async (
  recipeId: string,
  commentId: string,
  newCommentText: string,
) => {
  const updatedRecipe = await RecipeModel.findOneAndUpdate(
    {
      _id: recipeId,
      'comments._id': commentId,
    },
    {
      $set: { 'comments.$.comment': newCommentText },
    },
    { new: true },
  );

  if (!updatedRecipe) {
    throw new Error('Recipe or comment not found');
  }

  return updatedRecipe;
};

const deleteCommentFromDb = async(recipeId:string, commentId:string)=>{

  const result = await RecipeModel.findByIdAndUpdate(
    recipeId,
    {
      $pull: {
        comments: { _id: commentId },  
      },
    },
    { new: true }  
  );
  return result;
}

const getAllRecipesFromDb = async (query: Record<string, unknown>) => {
  const { userId, searchTerm, priceFilter, sortBy, sortOrder } = query;
  console.log("query from service", query);

  const filterConditions: Record<string, unknown> = {};

  // Set filtering conditions based on user membership status
  const userData: any = userId && userId !== "undefined" ? await UserModel.findById(userId) : null;
  if (userData?.premiumMembership === true) {
    filterConditions.isPublished = true;
  } else {
    filterConditions.isPremium = false;
    filterConditions.isPublished = true;
  }

  // Apply search term filter
  if (searchTerm) {
    filterConditions.$or = [
      { title: { $regex: searchTerm, $options: "i" } },
    ];
  }

  // Apply price filter
  if (priceFilter) {
    filterConditions.cookingTime = priceFilter;
  }

  // Set sorting conditions
  const sortConditions: Record<string, 1 | -1> = {};
  if (typeof sortBy === "string") {
    sortConditions[sortBy] = sortOrder === "asc" ? -1 : 1;
  }

  // Find recipes based on filter and sort conditions
  const result = await RecipeModel.find(filterConditions)
    .populate("user")
    .sort(sortConditions);

  return result;
};


const getAllRecipesForAdminFromDb = async () => {
  const result = await RecipeModel.find();
  return result;
  
};

const getSingleRecipeFromDb = async (recipeId:string) => {
  const result = await RecipeModel.findById(recipeId);

  return result;
};

const deleteRecipeIntoDb = async (recipeId: string) => {
  const result = await RecipeModel.findByIdAndDelete(recipeId);

  return result;
};

const updateRecipeIntoDb = async (payload:TRecipe, recipeId: string) => {
  const result = await RecipeModel.findByIdAndUpdate(recipeId ,payload,);

  return result;
};


const publishRecipeIntoDb = async (id: string) => {
  const recipe = await RecipeModel.findOneAndUpdate(
    { _id: id },
    { isPublished: true },
    { new: true },
  );

  return recipe;
};

const unpublishRecipeIntoDb = async (id: string) => {
  const recipe = await RecipeModel.findOneAndUpdate(
    { _id: id },
    { isPublished: false },
    { new: true },
  );

  return recipe;
};





export const recipeService = {
    createRecipeIntoDb,
    upVoteRecipeIntoDb,
    downVoteRecipeIntoDb,
    rateRecipeIntoDb,
    commentRecipeIntoDb,
    editRecipeCommentIntoDb,
    deleteCommentFromDb,
    getAllRecipesFromDb,
    getAllRecipesForAdminFromDb,
    getSingleRecipeFromDb,
    deleteRecipeIntoDb,
    publishRecipeIntoDb,
    unpublishRecipeIntoDb,
    updateRecipeIntoDb
};