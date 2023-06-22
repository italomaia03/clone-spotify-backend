import { Router } from "express";
import {
    addSongToPlaylist, // vem do songController.ts serve para adicionar musica a uma playlist
    createSong, // vem do songController.ts serve para criar musica nova
    getAllSongs, // utilizada para retornar todas as musicas
} from "../controllers/songController"; // controlador responsavel para lidar com as rotas das musicas
import { authMiddleware } from "../middleware/authMiddleware";

const songRouter: Router = Router();

songRouter
    .route("/songs") // rota para lidar com as requisições
    .get(getAllSongs)
    .post(authMiddleware, addSongToPlaylist); // authMiddleware: verifica a autenticação do usuario.
songRouter.route("/songs/database").post(authMiddleware, createSong);

export { songRouter };
