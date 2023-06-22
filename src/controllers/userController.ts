import { Request, Response } from "express";
import User from "../models/User";
import Playlist from "../models/Playlist";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

// retorna todos os usuários cadastrados
async function getAllUsers(_req: Request, res: Response) {
    const users = await User.findAll();
    res.status(StatusCodes.OK).json(users);
}

// retorna usuário que tem o id passado na url
async function getUserById(req: Request, res: Response) {
    const desiredId = Number(req.params.id);
    const desiredUser = await User.findByPk(desiredId, { include: [Playlist] });

    res.status(StatusCodes.OK).json({ msg: desiredUser });
}

// atualiza os dados de um usuário
async function updateUser(req: Request, res: Response) {
    const { payload } = req.user as JwtPayload; // req.user vem da autenticação
    const { userId } = payload; // id do usuário
    const desiredUser = { ...req.body };
    await User.update(desiredUser, {
        where: { id: userId },
    });
    res.status(StatusCodes.OK).json({ msg: "User has been updated" });
}

// deleta o usuário com o id informado
async function deleteUser(req: Request, res: Response) {
    const { payload } = req.user as JwtPayload; // req.user vem da autenticação
    const { userId } = payload; // id do usuário
    await Playlist.destroy({ where: { userId: userId } });
    await User.destroy({
        where: { id: userId },
    });
    res.status(StatusCodes.OK).json({ msg: "User has been deleted" });
}

export { getAllUsers, updateUser, deleteUser, getUserById };
