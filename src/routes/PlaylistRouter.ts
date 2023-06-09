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
    .route("/{:userId}")
    .get(authMiddleware, getAllPlaylists)
    .post(authMiddleware, createPlaylist);
playlistRouter
    .route("/{:userId}/playlist/{:playlistId}")
    .get(authMiddleware, getPlaylistById)
    .patch(authMiddleware, updatePlaylist)
    .delete(authMiddleware, deletePlaylist);

export { playlistRouter };
