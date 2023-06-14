import { NextFunction, Request, Response } from "express";
import Playlist from "../models/Playlist";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { BadRequestError } from "../errors";

async function getAllPlaylists(req: Request, res: Response) {
    const { userId } = req.user as JwtPayload;
    const playlists = await Playlist.findAll({ where: { userId: userId } });
    return res.status(StatusCodes.OK).json({ playlists: playlists });
}

async function createPlaylist(req: Request, res: Response) {
    const { name } = req.body;
    const { userId } = req.user as JwtPayload;

    const newPlaylist = {
        name,
        userId,
    } as Playlist;

    await Playlist.create(newPlaylist);

    res.status(StatusCodes.CREATED).json({ message: "Playlist created." });
}

async function getPlaylistById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredPlaylist = await Playlist.findByPk(desiredId);
    res.status(StatusCodes.OK).json({ desiredPlaylist });
}
async function updatePlaylist(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredPlaylist = { ...req.body };
    await Playlist.update(desiredPlaylist, {
        where: { id: desiredId },
    });
    res.status(StatusCodes.OK).json({ msg: "Updated" });
}
async function deletePlaylist(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    await Playlist.destroy({
        where: { id: desiredId },
    });
    res.status(StatusCodes.OK).json({ msg: "Deleted" });
}

export {
    getAllPlaylists,
    updatePlaylist,
    deletePlaylist,
    getPlaylistById,
    createPlaylist,
};
