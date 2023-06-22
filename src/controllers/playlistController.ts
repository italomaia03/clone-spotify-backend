import { Request, Response } from "express";
import Playlist from "../models/Playlist";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { NotFoundError } from "../errors";
import Song from "../models/Song";

async function getAllPlaylists(req: Request, res: Response) {
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;
    const playlists = await Playlist.findAll({
        where: { userId: userId },
        include: Song,
    });
    return res.status(StatusCodes.OK).json({ playlists: playlists });
}

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

async function getPlaylistById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;
    const desiredPlaylist = await Playlist.findOne({
        where: { id: desiredId, userId: userId },
        attributes: ["name", "description"],
        include: {
            model: Song,
            attributes: ["name", "author", "album"],
            through: {
                attributes: [],
            },
        },
    });
    res.status(StatusCodes.OK).json({ msg: desiredPlaylist });
}
async function updatePlaylist(req: Request, res: Response) {
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;
    const desiredId = Number(req.params.id);
    const updatedPlaylist = { ...req.body };
    const desiredPlaylist = await Playlist.findOne({
        where: { id: desiredId, userId: userId },
    });

    if (!desiredPlaylist) {
        throw new NotFoundError("Playlist not found.");
    }

    await Playlist.update(updatedPlaylist, {
        where: { id: desiredId, userId: userId },
    });

    res.status(StatusCodes.OK).json({ msg: "Playlist has been updated" });
}
async function deletePlaylist(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const { payload } = req.user as JwtPayload;
    const { userId } = payload;
    await Playlist.destroy({
        where: { id: desiredId, userId: userId },
    });
    res.status(StatusCodes.OK).json({ msg: "Playlist has been deleted" });
}

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
    if (!desiredSong) {
        throw new NotFoundError(`Song ${songId} does not exist`);
    }
    if (!desiredPlaylist) {
        throw new NotFoundError(`Playlist ${playlistId} does not exist`);
    }
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
