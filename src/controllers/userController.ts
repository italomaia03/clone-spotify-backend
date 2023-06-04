import { Request, Response } from "express";

async function createUser(req: Request, res: Response) {
    console.log(req.body);
    res.send("working");
}

export { createUser };
