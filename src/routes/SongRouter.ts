import { Router } from "express";
import { getAllSongs } from "../controllers/songController";

const songRouter: Router = Router();

songRouter.route("/songs").get(getAllSongs);

export { songRouter };
