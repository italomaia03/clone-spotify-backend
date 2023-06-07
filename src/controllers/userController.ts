import { Request, Response } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
async function loginUser(req: Request, res: Response) {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ msg: "Please, fill up all the fields" });
  }
  const desiredUser = await User.findOne({ where: { username } });

  if (!desiredUser) {
    return res.status(404).json({
      msg: `No user with username ${username} found. Please, try again.`,
    });
  }
  if (password !== desiredUser.password) {
    return res
      .status(400)
      .json({ msg: "Username or password does not match. Please, try again." });
  }

  const secret = process.env.JWT_SECRET!;
  const token = jwt.sign({ username }, secret, { expiresIn: "30d" });
  res
    .status(200)
    .json({ msg: `You are logged in. Welcome, ${username}`, token });
}

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

export {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
};
