import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/userController";

const userRouter: Router = Router();

userRouter.route("/users").get(getAllUsers);
userRouter
    .route("/user/:id")
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser);

export { userRouter };
