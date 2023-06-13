import { NextFunction, Request, Response } from "express";
import { UnauthenticatedError } from "../errors/";
import jwt from "jsonwebtoken";

async function authMiddleware(
    req: Request,
    _res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthenticatedError("No token provided");
    }

    const token: string = authHeader!.split(" ")[1];
    try {
        const decodedToken = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );
        req.user = { decodedToken };

        next();
    } catch (error) {
        throw new UnauthenticatedError("No token provided");
    }
}

export { authMiddleware };
