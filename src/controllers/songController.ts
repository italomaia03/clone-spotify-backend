import { Request, Response } from "express";
import Song from "../models/Song";
import { StatusCodes } from "http-status-codes";

async function getAllSongs(_req: Request, res: Response) {
    const songs = await Song.findAll();
    res.status(StatusCodes.OK).json(songs);
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

export { getAllSongs, updateSong, deleteSong, getSongById };
