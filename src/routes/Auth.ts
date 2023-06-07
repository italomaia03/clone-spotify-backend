import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController";

export const auth: Router = Router();

auth.route("/login").post(loginUser);
auth.route("/signup").post(createUser);
