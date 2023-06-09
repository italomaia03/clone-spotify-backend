import { Request, Response } from "express";
import Song from "../models/Song";

async function getAllSongs(_req: Request, res: Response) {
    const songs = await Song.findAll();
    res.status(res.statusCode).json(songs);
}

async function getSongById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredSong = await Song.findByPk(desiredId);
    res.status(res.statusCode).json({ desiredSong });
}
async function updateSong(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredSong = { ...req.body };
    await Song.update(desiredSong, {
        where: { id: desiredId },
    });
    res.status(res.statusCode).json({ msg: "Updated" });
}
async function deleteSong(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    await Song.destroy({
        where: { id: desiredId },
    });
    res.status(res.statusCode).json({ msg: "Deleted" });
}

export { getAllSongs, updateSong, deleteSong, getSongById };
