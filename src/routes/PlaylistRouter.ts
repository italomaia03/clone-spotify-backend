import { Router } from "express";
import {
    createPlaylist,
    deletePlaylist,
    getAllPlaylists,
    getPlaylistById,
    updatePlaylist,
} from "../controllers/playlistController";
import { authMiddleware } from "../middleware/authMiddleware";

const playlistRouter: Router = Router();

playlistRouter
    .route("/playlists")
    .get(authMiddleware, getAllPlaylists)
    .post(authMiddleware, createPlaylist);
playlistRouter
    .route("/playlists/:playlistId")
    .get(authMiddleware, getPlaylistById)
    .patch(authMiddleware, updatePlaylist)
    .delete(authMiddleware, deletePlaylist);

export { playlistRouter };
