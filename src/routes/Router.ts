import { Router, Request, Response } from "express";

const router: Router = Router();

router.route("/").get((_req: Request, res: Response): void => {
    res.send(`routing...`);
});

export { router };
