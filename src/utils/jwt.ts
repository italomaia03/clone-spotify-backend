import { Response } from "express";
import jwt from "jsonwebtoken";

// criação do token JWT
function createToken(tokenUser: Object) {
    return jwt.sign(tokenUser, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME,
    });
}

// decodificação do token JWT
function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}

// função instrui o browser do cliente a armazenar token JWT nos cookies
function attachCookieToResponse(res: Response, user: Object) {
    const token = createToken({ payload: user });

    res.cookie("token", token),
        {
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 3600 * 24), // 1000ms(1s) * 3600s(1h) * 24h(1 dia)
        };
}
export { createToken, verifyToken, attachCookieToResponse };
