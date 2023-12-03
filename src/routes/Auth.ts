import { Router } from "express";
import { createUser, loginUser, logout } from "../controllers/authController";

export const auth: Router = Router();

auth.route("/login").post(loginUser);
auth.route("/signup").post(createUser);
auth.route("/logout").get(logout);
