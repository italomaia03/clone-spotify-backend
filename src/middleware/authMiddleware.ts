import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors/";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils";

async function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const token = req.cookies.token;

    if (!token) {
        throw new UnauthenticatedError("No token provided");
    }

    try {
        const decodedToken = verifyToken(token);
        req.user = { ...(decodedToken as JwtPayload) };

        next();
    } catch (error) {
        throw new UnauthenticatedError("No token provided");
    }
}

export { authMiddleware };
