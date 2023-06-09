import { Request, Response } from "express";
import Playlist from "../models/Playlist";

async function getAllPlaylists(_req: Request, res: Response) {
    const playlists = await Playlist.findAll();
    res.status(res.statusCode).json(playlists);
}

async function createPlaylist(req: Request, res: Response) {
    const { name } = req.body;
}

async function getPlaylistById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredPlaylist = await Playlist.findByPk(desiredId);
    res.status(res.statusCode).json({ desiredPlaylist });
}
async function updatePlaylist(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredPlaylist = { ...req.body };
    await Playlist.update(desiredPlaylist, {
        where: { id: desiredId },
    });
    res.status(res.statusCode).json({ msg: "Updated" });
}
async function deletePlaylist(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    await Playlist.destroy({
        where: { id: desiredId },
    });
    res.status(res.statusCode).json({ msg: "Deleted" });
}

export {
    getAllPlaylists,
    updatePlaylist,
    deletePlaylist,
    getPlaylistById,
    createPlaylist,
};
