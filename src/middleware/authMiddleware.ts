import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors/";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils";

// função de autenticação
async function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    // recebe o token dos cookies
    const token = req.cookies.token;

    // caso não haja token, retorna erro
    if (!token) {
        throw new UnauthenticatedError("No token provided");
    }

    try {
        // decodificação do token para recuperar as informações do usuário
        const decodedToken = verifyToken(token);
        req.user = { ...(decodedToken as JwtPayload) };
        // passa para o middleware seguinte
        next();
    } catch (error) {
        // caso não seja encontrado um token válido no try,
        // um erro é lançado
        throw new UnauthenticatedError("No token provided");
    }
}

export { authMiddleware };
