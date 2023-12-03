import { Request, Response } from "express";
import User from "../models/User";
import { BadRequestError, NotFoundError } from "../errors";
import { StatusCodes } from "http-status-codes";
import createTokenUser from "../utils/createTokenUser";
import { attachCookieToResponse } from "../utils";

// função de login
async function loginUser(req: Request, res: Response) {
    const { username, password } = req.body;

    // se username e password não forem informados, retorna um erro
    if (!username || !password) {
        throw new BadRequestError("Invalid credentials");
    }
    const user = await User.findOne({ where: { username } });

    // caso o usuário informado não esteja cadastrado
    if (!user) {
        throw new NotFoundError(
            `No user with username ${username} found. Please, try again.`
        );
    }
    if (password !== user.password) {
        throw new BadRequestError("Invalid credentials. Please, try again.");
    }

    // cria token JWT com informações como nome e ID do usuário
    const tokenUser = createTokenUser(user);

    // envia o token JWT para os cookies do navegador
    attachCookieToResponse(res, tokenUser);
    res.status(StatusCodes.OK).json({
        msg: `You are logged in. Welcome, ${username}`,
    });
}

// cadastro de usuário
async function createUser(req: Request, res: Response) {
    const { email, password, username, date_of_birth, gender } = req.body;
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

// logout do usuário
async function logout(_req: Request, res: Response) {
    // remove o token de autenticação dos cookies do navegador
    res.cookie("token", "logout", {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.status(StatusCodes.OK).json({ msg: "User logged out" });
}

export { loginUser, createUser, logout };
