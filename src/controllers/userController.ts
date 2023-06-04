import { Request, Response } from "express";
import { User } from "../models/User";

async function getAllUsers(req: Request, res: Response) {
    const users = await User.findAll();
    res.status(res.statusCode).json(users);
}

async function createUser(req: Request, res: Response) {
    const { email, password, username, day, month, year, gender } = req.body;
    const date_of_birth = new Date(year, month - 1, day);
    await User.create({ email, password, username, date_of_birth, gender });
    res.status(res.statusCode).json({
        success: true,
        msg: "User has been successfully created",
    });
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

export { createUser, getAllUsers, updateUser, deleteUser, getUserById };
