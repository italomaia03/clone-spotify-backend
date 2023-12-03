import { Router } from "express";
import {
    createPlaylist,
    deletePlaylist,
    getAllPlaylists,
    getPlaylistById,
    removeSongFromPlaylist,
    updatePlaylist,
} from "../controllers/playlistController";
import { authMiddleware } from "../middleware/authMiddleware";

const playlistRouter: Router = Router();

// todas as rotas de playlist requerem autenticação para serem acessadas
playlistRouter
    .route("/playlists")
    .get(authMiddleware, getAllPlaylists)
    .post(authMiddleware, createPlaylist);
playlistRouter
    .route("/playlists/:id")
    .get(authMiddleware, getPlaylistById)
    .put(authMiddleware, updatePlaylist)
    .delete(authMiddleware, deletePlaylist);

playlistRouter
    .route("/playlists/:playlistId/songs/:songId")
    .delete(authMiddleware, removeSongFromPlaylist);

export { playlistRouter };
