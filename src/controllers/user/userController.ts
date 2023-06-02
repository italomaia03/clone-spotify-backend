import { Request, Response } from "express";

async function createUser(req: Request, res: Response) {
    res.send("working");
}

export { createUser };
