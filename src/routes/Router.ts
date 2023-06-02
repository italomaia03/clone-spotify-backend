import { Router, Request, Response } from "express";
import { createUser } from "../controllers/user/userController";

const router: Router = Router();

router.route("/").get((_req: Request, res: Response): void => {
    res.send(`routing...`);
});

router.route("/user").post(createUser);

export { router };
