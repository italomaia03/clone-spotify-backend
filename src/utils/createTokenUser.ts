import User from "../models/User";

// recebe um usuário e cria um modelo para ser utilizado na criação do token
// apenas com o username e o id do usuário
export default function createTokenUser(user: User) {
    return { username: user.username, userId: user.id };
}
