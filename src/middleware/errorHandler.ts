import { NextFunction, Request, Response } from "express";
import { CustomApiError } from "../errors/CustomApiError";
import { StatusCodes } from "http-status-codes";
import { ValidationError } from "sequelize";

export function errorHandler(
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof CustomApiError) {
        res.status(err.statusCode!).json({ message: err.message });
    }
    if (err instanceof ValidationError) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: err.message });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
}
