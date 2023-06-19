import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";
import createTokenUser from "../utils/createTokenUser";
import { attachCookieToResponse } from "../utils";

async function loginUser(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!username || !password) {
        throw new BadRequestError("Invalid credentials");
    }
    const user = await User.findOne({ where: { username } });

    if (!user) {
        throw new NotFoundError(
            `No user with username ${username} found. Please, try again.`
        );
    }
    if (password !== user.password) {
        throw new BadRequestError("Invalid credentials. Please, try again.");
    }

    const tokenUser = createTokenUser(user);

    attachCookieToResponse(res, tokenUser);
    res.status(StatusCodes.OK).json({
        msg: `You are logged in. Welcome, ${username}`,
    });
}
async function createUser(req: Request, res: Response) {
    const { email, password, username, day, month, year, gender } = req.body;
    const date_of_birth = new Date(year, month - 1, day);
    const newUser = {
        email,
        password,
        username,
        date_of_birth,
        gender,
    } as User;
    await User.create(newUser);
    res.status(StatusCodes.CREATED).json({
        success: true,
        msg: "User has been successfully created",
    });
}

async function logout(req: Request, res: Response) {
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "User logged out" });
}

export { loginUser, createUser, logout };
