import express from "express";
import { auth } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { validateRecipeSchema } from "./recipe.validation";
import { recipeController } from "./recipe.controller";


const recipeRoute = express.Router();

recipeRoute.get('/', recipeController.getAllRecipes);
recipeRoute.get('/admin',auth('user'), recipeController.getAllRecipesForAdmin);
recipeRoute.get('/:recipeId',auth('user'), recipeController.getSingleRecipe);
recipeRoute.delete('/:recipeId',auth('user', 'admin'), recipeController.deleteRecipe);
recipeRoute.patch('/publish/:recipeId',auth( 'user'), recipeController.publishRecipe);
recipeRoute.patch('/unpublish/:recipeId',auth( 'user'), recipeController.unPublishRecipe);
recipeRoute.post('/',auth('user'),  validateRequest(validateRecipeSchema.createRecipeValidation), recipeController.createRecipe);
recipeRoute.patch('/up-vote/:recipeId',auth('user'), recipeController.upVoteRecipe);
recipeRoute.patch('/down-vote/:recipeId',auth('user'), recipeController.downVoteRecipe);
recipeRoute.patch('/rating/:recipeId',auth('user'), recipeController.rateRecipe);
recipeRoute.patch('/comment/:recipeId',auth('user'), recipeController.addComment);
recipeRoute.patch('/edit-comment/:recipeId/:commentId',auth('user'), recipeController.editRecipeComment);


export default recipeRoute