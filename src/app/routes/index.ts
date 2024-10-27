import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import recipeRoute from '../modules/recipe/recipe.route';
import passwordMutationRoute from '../modules/passwordMutation/passwordMutation.route';



const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/recipe",
    route: recipeRoute,
  },
  {
    path: "/password",
    route: passwordMutationRoute,
  },
  
 
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
