import  Express  from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Express.Router()

router.post("/signup", validateRequest(UserValidation.createUserValidationSchema), UserController.createUser)
router.post("/login", validateRequest(UserValidation.loginUserValidationSchema), UserController.loginUser )
router.patch("/update-user/:id", auth('user','admin'), UserController.updateUser )
router.patch("/follow-user/:id", auth('user'), UserController.followUser )
router.patch("/unfollow-user/:id", auth('user'), UserController.removeFollowedUser )
router.get("/user", auth('admin'), UserController.getAllUser )
router.get("/user-with-recipe/:id", auth('user'), UserController.getSingleUserWithPostedRecipe)
router.get("/posted-recipe", auth('user'), UserController.getUserPostedRecipe )
router.get("/user/:id", auth('user', 'admin'), UserController.getSingleUser )
router.get("/user-with-email", auth('user','admin'), UserController.getSingleUserWithEmail )
router.patch("/block-user/:id", auth('admin'), UserController.blockUser )
router.patch("/unblock-user/:id", auth('admin'), UserController.unblockUser )
router.delete("/delete-user/:id", auth('admin'), UserController.deleteUser )
router.post("/admin",  UserController.createAdmin )
router.get("/admin", auth('admin'),  UserController.getAllAdmin )
router.get("/admin/:id", auth('admin'),  UserController.getSingleAdmin)
router.patch("/update-admin/:id", auth('admin'),  UserController.updateAdmin )
router.delete("/delete-admin/:id", auth('admin'),  UserController.deleteAdmin )

export const UserRoutes = router;