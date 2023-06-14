import jwt from "jsonwebtoken";
function createToken(tokenUser: Object) {
    return jwt.sign(tokenUser, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_LIFETIME,
    });
}

function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}

export { createToken, verifyToken };
