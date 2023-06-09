import { Request, Response } from "express";
import User from "../models/User";

async function getAllUsers(_req: Request, res: Response) {
    const users = await User.findAll();
    res.status(res.statusCode).json(users);
}

async function getUserById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredUser = await User.findByPk(desiredId);
    res.status(res.statusCode).json({ desiredUser });
}
async function updateUser(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredUser = { ...req.body };
    await User.update(desiredUser, {
        where: { id: desiredId },
    });
    res.status(res.statusCode).json({ msg: "Updated" });
}
async function deleteUser(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    await User.destroy({
        where: { id: desiredId },
    });
    res.status(res.statusCode).json({ msg: "Deleted" });
}

export { getAllUsers, updateUser, deleteUser, getUserById };
