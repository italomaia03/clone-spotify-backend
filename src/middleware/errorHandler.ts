import { NextFunction, Request, Response } from "express";
import { CustomApiError } from "../errors/CustomApiError";
import { StatusCodes } from "http-status-codes";

export function errorHandler(
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) {
    if (err instanceof CustomApiError) {
        res.status(err.statusCode!).json({ message: err.message });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: err.message });
}
