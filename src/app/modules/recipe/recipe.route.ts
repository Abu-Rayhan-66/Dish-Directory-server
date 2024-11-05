import express from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { validateRecipeSchema } from "./recipe.validation";
import { recipeController } from "./recipe.controller";


const recipeRoute = express.Router();

recipeRoute.get('/admin-recipe', auth('admin'), recipeController.getAllRecipesForAdmin);
recipeRoute.get('/user-recipe', recipeController.getAllRecipes);
recipeRoute.get('/single-recipe/:recipeId',auth('user'), recipeController.getSingleRecipe);

recipeRoute.delete('/:recipeId',auth('user', 'admin'), recipeController.deleteRecipe);
recipeRoute.patch('/update-recipe/:recipeId', recipeController.updateRecipe);
recipeRoute.patch('/publish/:recipeId',auth( 'admin'), recipeController.publishRecipe);
recipeRoute.patch('/unpublish/:recipeId',auth( 'admin'), recipeController.unPublishRecipe);
recipeRoute.post('/',auth('user'),  validateRequest(validateRecipeSchema.createRecipeValidation), recipeController.createRecipe);
recipeRoute.patch('/up-vote/:recipeId',auth('user'), recipeController.upVoteRecipe);
recipeRoute.patch('/down-vote/:recipeId',auth('user'), recipeController.downVoteRecipe);
recipeRoute.patch('/rating/:recipeId',auth('user'), recipeController.rateRecipe);
recipeRoute.patch('/comment/:recipeId',auth('user'), recipeController.addComment);
recipeRoute.delete('/delete-comment/:recipeId/:id',auth('user'), recipeController.deleteComment);
recipeRoute.patch('/edit-comment/:recipeId/:commentId',auth('user'), recipeController.editRecipeComment);


export default recipeRoute