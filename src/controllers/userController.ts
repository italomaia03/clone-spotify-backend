import { Request, Response } from "express";
import User from "../models/User";
import Playlist from "../models/Playlist";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

async function getAllUsers(_req: Request, res: Response) {
    const users = await User.findAll();
    res.status(StatusCodes.OK).json(users);
}

async function getUserById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredUser = await User.findByPk(desiredId, { include: [Playlist] });

    res.status(StatusCodes.OK).json({ desiredUser });
}
async function updateUser(req: Request, res: Response) {
    const { userId } = req.user as JwtPayload;
    const desiredUser = { ...req.body };
    await User.update(desiredUser, {
        where: { id: userId },
    });
    res.status(StatusCodes.OK).json({ msg: "Updated" });
}
async function deleteUser(req: Request, res: Response) {
    const { userId } = req.user as JwtPayload;
    await Playlist.destroy({ where: { userId: userId } });
    await User.destroy({
        where: { id: userId },
    });
    res.status(StatusCodes.OK).json({ msg: "Deleted" });
}

export { getAllUsers, updateUser, deleteUser, getUserById };
