import { Router } from "express";
import {
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter: Router = Router();

userRouter
    .route("/users")
    .get(getAllUsers)
    .patch(authMiddleware, updateUser)
    .delete(authMiddleware, deleteUser);
userRouter.route("/users/:id").get(authMiddleware, getUserById);

export { userRouter };
