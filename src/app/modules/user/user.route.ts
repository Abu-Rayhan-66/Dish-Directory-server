import  Express  from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";

const router = Express.Router()

router.post("/signup", validateRequest(UserValidation.createUserValidationSchema), UserController.createUser)
router.post("/login", validateRequest(UserValidation.loginUserValidationSchema), UserController.loginUser )
router.patch("/update-user/:id", auth('user'), UserController.updateUser )
router.patch("/follow-user/:id", auth('user'), UserController.followUser )
router.patch("/unfollow-user/:id", auth('user'), UserController.removeFollowedUser )
router.get("/user", auth('user'), UserController.getAllUser )
router.get("/user-with-recipe/:id", auth('user'), UserController.getSingleUserWithPostedRecipe )
router.get("/user/:id", auth('user'), UserController.getSingleUser )
router.patch("/block-user/:id", auth('user'), UserController.blockUser )
router.patch("/unblock-user/:id", auth('user'), UserController.unblockUser )
router.delete("/delete-user/:id", auth('user'), UserController.deleteUser )
router.post("/admin",  UserController.createAdmin )
router.get("/admin", auth('user'),  UserController.getAllAdmin )
router.patch("/update-admin/:id", auth('user'),  UserController.updateAdmin )
router.delete("/delete-admin/:id", auth('user'),  UserController.deleteAdmin )

export const UserRoutes = router;