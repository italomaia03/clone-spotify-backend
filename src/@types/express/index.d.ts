import { JwtPayload } from "jsonwebtoken";
import User from "../../models/User";

// extensão do objeto de Request do express para comportar o atributo
// user passado pelo middleware de autenticação
declare global {
    namespace Express {
        interface Request {
            user: string | JwtPayload;
        }
    }
}
