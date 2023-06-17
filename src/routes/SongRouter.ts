import { Router } from "express";
import {
    addSongToPlaylist,
    createSong,
    getAllSongs,
} from "../controllers/songController";
import { authMiddleware } from "../middleware/authMiddleware";

const songRouter: Router = Router();

songRouter
    .route("/songs")
    .get(getAllSongs)
    .post(authMiddleware, addSongToPlaylist);
songRouter.route("/songs/database").post(authMiddleware, createSong);

export { songRouter };
