import { Router, Request, Response } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser,
} from "../controllers/userController";

const router: Router = Router();

router.route("/").get((_req: Request, res: Response): void => {
    res.send(`routing...`);
});

router.route("/users").get(getAllUsers);
router.route("/user").post(createUser);
router.route("/user/:id").get(getUserById).patch(updateUser).delete(deleteUser);

export { router };
