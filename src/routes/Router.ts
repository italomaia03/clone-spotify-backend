import { Router, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controllers/userController";

const router: Router = Router();

router.route("/users").get(getAllUsers);
router.route("/user/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export { router };
