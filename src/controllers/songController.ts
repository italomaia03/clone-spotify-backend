import { Request, Response } from "express";
import Song from "../models/Song";
import { StatusCodes } from "http-status-codes";
import Playlist from "../models/Playlist";
import { NotFoundError } from "../errors";
import { JwtPayload } from "jsonwebtoken";

async function getAllSongs(_req: Request, res: Response) {
    const songs = await Song.findAll();
    res.status(StatusCodes.OK).json(songs);
}

async function createSong(req: Request, res: Response) {
    const song: Song = req.body as Song;
    await Song.create(song);

    res.status(StatusCodes.CREATED).json({
        msg: `Song ${song.name} has been added to database.`,
    });
}

async function getSongById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredSong = await Song.findByPk(desiredId);
    res.status(StatusCodes.OK).json({ desiredSong });
}
async function updateSong(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredSong = { ...req.body };
    await Song.update(desiredSong, {
        where: { id: desiredId },
    });
    res.status(StatusCodes.OK).json({ msg: "Updated" });
}
async function deleteSong(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    await Song.destroy({
        where: { id: desiredId },
    });
    res.status(StatusCodes.OK).json({ msg: "Deleted" });
}

async function addSongToPlaylist(req: Request, res: Response) {
    const { songId, playlistId } = req.body;
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;
    const desiredPlaylist = await Playlist.findOne({
        where: { id: playlistId, userId: userId },
    });
    const desiredSong = await Song.findOne({
        where: { id: songId },
    });
    if (!desiredSong) {
        throw new NotFoundError(`Song ${songId} does not exist`);
    }
    if (!desiredPlaylist) {
        throw new NotFoundError(`Playlist ${playlistId} does not exist`);
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
