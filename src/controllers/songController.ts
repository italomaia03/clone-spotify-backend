import { Request, Response } from "express";
import Song from "../models/Song";
import { StatusCodes } from "http-status-codes";
import Playlist from "../models/Playlist";
import { NotFoundError } from "../errors";
import { JwtPayload } from "jsonwebtoken";

// Usado o modelo song para atualizar os dados do banco

// função que serve para retornar todas as musicas, utilizar o modelo song para buscar as musicas
async function getAllSongs(_req: Request, res: Response) {
    const songs = await Song.findAll();
    res.status(StatusCodes.OK).json(songs);
}

// função responsável por criar musicas novas,extrai os dados da música do corpo da requisição req.body e os insere no banco de dados usando o modelo Song
async function createSong(req: Request, res: Response) {
    const song: Song = req.body as Song;
    await Song.create(song);

    res.status(StatusCodes.CREATED).json({
        msg: `Song ${song.name} has been added to database.`,
    });
}

// função é responsável por retornar uma música específica com base em seu ID, extrai o ID atraves do req.params.id
async function getSongById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredSong = await Song.findByPk(desiredId);
    res.status(StatusCodes.OK).json({ desiredSong });
}

// função para atualizar os dados das musicas, extrai o ID e os novos dados da musica com req.body
async function updateSong(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredSong = { ...req.body };
    await Song.update(desiredSong, {
        where: { id: desiredId },
    });
    res.status(StatusCodes.OK).json({ msg: "Song has been updated" });
}

// função para excluir musicas
async function deleteSong(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    await Song.destroy({
        where: { id: desiredId },
    });
    res.status(StatusCodes.OK).json({ msg: "Song has been deleted" });
}

// função para adicionar musica a uma playlist já existente
async function addSongToPlaylist(req: Request, res: Response) {
    const { songId, playlistId } = req.body; //extrai os IDs da música e da playlist do corpo da requisição req.body
    const { payload } = req.user as JwtPayload; // ID do usuário autenticado req.user
    const { userId } = payload;
    const desiredPlaylist = await Playlist.findOne({
        where: { id: playlistId, userId: userId },
    });
    const desiredSong = await Song.findOne({
        where: { id: songId },
    });
    if (!desiredSong) {
        throw new NotFoundError(`Song ${songId} does not exist`); // se a musica foi encontrada
    }
    if (!desiredPlaylist) {
        throw new NotFoundError(`Playlist ${playlistId} does not exist`); // se a playlist foi encontrada
    }
    desiredPlaylist.$add("song", desiredSong!);

    res.status(StatusCodes.CREATED).json({
        msg: `${desiredSong.name} has been added to ${desiredPlaylist.name}`,
    });
}

export {
    getAllSongs,
    createSong,
    updateSong,
    deleteSong,
    getSongById,
    addSongToPlaylist,
};
