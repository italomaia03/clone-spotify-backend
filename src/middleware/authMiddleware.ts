import { NextFunction, Request, Response } from "express";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log(req.headers.authorization);
    next();
}

export { authMiddleware };
