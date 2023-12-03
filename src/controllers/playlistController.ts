import { Request, Response } from "express";
import Playlist from "../models/Playlist";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { NotFoundError } from "../errors";
import Song from "../models/Song";

// função que requere todas as playlist cadastradas no banco de dados para um determinado usuário
async function getAllPlaylists(req: Request, res: Response) {
    const { payload } = req.user as JwtPayload; // req.user armazena payload do token JWT
    const { userId } = payload; // informações do usuário dentro do token
    const playlists = await Playlist.findAll({
        where: { userId: userId },
        include: Song,
    });
    return res.status(StatusCodes.OK).json({ playlists: playlists });
}

// criação de playlists para o usuário especificado na autenticação
async function createPlaylist(req: Request, res: Response) {
    const { name } = req.body;
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;

    const newPlaylist = {
        name,
        userId,
    } as Playlist;

    await Playlist.create(newPlaylist);

    res.status(StatusCodes.CREATED).json({ msg: "Playlist created." });
}

// busca por uma playlist específica
async function getPlaylistById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;
    const desiredPlaylist = await Playlist.findOne({
        where: { id: desiredId, userId: userId },
        attributes: ["name", "description"],
        include: {
            // inclui todas as música cadastradas
            model: Song,
            attributes: ["name", "author", "album"],
            through: {
                attributes: [],
            },
        },
    });
    // retorna JSON com a playlist e o array de músicas cadastradas nela
    res.status(StatusCodes.OK).json({ msg: desiredPlaylist });
}

// atualiza os dados da playlist de interesse
async function updatePlaylist(req: Request, res: Response) {
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;
    const desiredId = Number(req.params.id);
    const updatedPlaylist = { ...req.body };
    const desiredPlaylist = await Playlist.findOne({
        where: { id: desiredId, userId: userId },
    });

    if (!desiredPlaylist) {
        throw new NotFoundError("Playlist not found."); // caso não encontre a playlise, retorna um erro
    }

    await Playlist.update(updatedPlaylist, {
        where: { id: desiredId, userId: userId },
    });

    res.status(StatusCodes.OK).json({ msg: "Playlist has been updated" });
}

// deleta a playlist de interesse
async function deletePlaylist(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;
    await Playlist.destroy({
        where: { id: desiredId, userId: userId },
    });
    res.status(StatusCodes.OK).json({ msg: "Playlist has been deleted" });
}

// exclui uma música cadastrada na playlist
async function removeSongFromPlaylist(req: Request, res: Response) {
    const { playlistId, songId } = req.params;
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;

    const desiredPlaylist = await Playlist.findOne({
        where: { id: playlistId, userId: userId },
    });

    const desiredSong = await Song.findOne({
        where: { id: songId },
    });

    // verifica se a música buscada existe no banco de dados
    // caso a música não esteja cadastrada, lança um erro
    if (!desiredSong) {
        throw new NotFoundError(`Song ${songId} does not exist`);
    }

    // verifica se a playlist buscada existe no banco de dados
    // caso a playlist não esteja cadastrada, lança um erro
    if (!desiredPlaylist) {
        throw new NotFoundError(`Playlist ${playlistId} does not exist`);
    }

    // remove a música da playlist e salva a transação
    desiredPlaylist.$remove("song", desiredSong);

    res.status(StatusCodes.OK).json({
        msg: `Song ${desiredSong.name} has been removed from playlist ${desiredPlaylist.name}`,
    });
}

export {
    getAllPlaylists,
    updatePlaylist,
    deletePlaylist,
    getPlaylistById,
    createPlaylist,
    removeSongFromPlaylist,
};
